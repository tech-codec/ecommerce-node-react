const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Visit = require('../models/Visit');

// Récupérer les statistiques de visite
const getVisitors = async (req, res) => {
  try {
    // Définir la date de 30 jours en arrière
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Définir la date du jour actuel
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Agréger les données de visite pour les 30 derniers jours jusqu'au jour actuel
    const visitorsData = await Visit.aggregate([
      {
        // Filtrer les documents pour inclure uniquement ceux créés dans les 30 derniers jours jusqu'au jour actuel
        $match: {
          date: { $gte: thirtyDaysAgo, $lte: today }
        }
      },
      {
        // Grouper par date et calculer le total des visiteurs et des pages vues
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          visitors: { $sum: "$visitors" },
          pageViews: { $sum: "$pageViews" }
        }
      },
      {
        // Trier les résultats par date ascendante
        $sort: { _id: 1 }
      }
    ]);

    // Formater les résultats pour la réponse JSON
    res.json(visitorsData.map(item => ({
      date: item._id,
      visitors: item.visitors,
      pageViews: item.pageViews
    })));
  } catch (error) {
    // Gérer les erreurs et envoyer une réponse d'erreur au client
    console.error('Erreur lors de la récupération des statistiques de visite:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// Récupérer l'activité des clients
const getCustomerActivity = async (req, res) => {
  try {
    // Effectuez une agrégation sur la collection Order
    const customerActivity = await Order.aggregate([
      {
        // Groupez les documents par utilisateur (champ user)
        $group: {
          _id: "$user",
          orders: { $sum: 1 }, // Calculez le nombre de commandes par utilisateur
          totalSpent: { $sum: "$totalPrice" } // Calculez le montant total dépensé par utilisateur
        }
      },
      {
        // Triez les résultats par nombre de commandes en ordre décroissant
        $sort: { orders: -1 }
      },
      {
        // Limitez les résultats aux 10 premiers utilisateurs
        $limit: 10
      },
      {
        // Effectuez un lookup pour joindre les informations de l'utilisateur à partir de la collection users
        $lookup: {
          from: "users", // Collection à joindre
          localField: "_id", // Champ local (user ID)
          foreignField: "_id", // Champ distant (user ID dans la collection users)
          as: "userInfo" // Nom du champ où stocker les résultats de la jointure
        }
      },
      {
        // Décompressez le tableau userInfo pour simplifier l'accès
        $unwind: "$userInfo"
      },
      {
        // Projetez les champs nécessaires pour la réponse finale
        $project: {
          _id: 0,
          customer: "$userInfo.name",
          orders: 1,
          totalSpent: 1
        }
      }
    ]);

    // Envoyez la réponse JSON
    res.json(customerActivity);
  } catch (error) {
    // Gérez les erreurs en les consignant et en renvoyant un message d'erreur au client
    console.error('Erreur lors de la récupération de l\'activité des clients:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Récupérer les dernières commandes
const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    res.json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes récentes:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les données de vente
const getSales = async (req, res) => {
  try {
    // Calculer la date de 30 jours en arrière
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Agréger les données de commande pour les 30 derniers jours
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }  // Filtrer les commandes créées dans les 30 derniers jours
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },  // Grouper par date
          revenue: { $sum: "$totalPrice" }  // Calculer le revenu total pour chaque date
        }
      },
      {
        $sort: { _id: 1 }  // Trier les résultats par date ascendante
      }
    ]);

    // Formater les données pour la réponse JSON
    res.json(salesData.map(item => ({
      date: item._id,
      revenue: item.revenue
    })));
  } catch (error) {
    console.error('Erreur lors de la récupération des données de vente:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Statistiques en temps réel
const getRealTimeStats = async (req, res) => {
  try {
    // Définir les dates pour aujourd'hui et le mois dernier
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Effectuer des requêtes parallèles pour les statistiques
    const [todayStats, lastMonthStats, visitStats] = await Promise.all([
      // Statistiques du jour
      Order.aggregate([
        { $match: { createdAt: { $gte: today } } },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalPrice" },
            orders: { $sum: 1 }
          }
        }
      ]),
      // Statistiques du mois dernier pour comparaison
      Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        {
          $group: {
            _id: null,
            lastMonthRevenue: { $sum: "$totalPrice" },
            lastMonthOrders: { $sum: 1 }
          }
        }
      ]),
      // Nouveaux clients et taux de conversion
      Promise.all([
        User.countDocuments({ createdAt: { $gte: today } }),
        User.countDocuments({ createdAt: { $gte: lastMonth } }),
        Product.countDocuments({ stock: { $lt: 5 } })
      ])
    ]);

    // Calculer les métriques
    const currentRevenue = todayStats[0]?.revenue || 0;
    const lastMonthRevenue = lastMonthStats[0]?.lastMonthRevenue || 0;
    const revenueGrowth = lastMonthRevenue ? ((currentRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    const orderCompletionRate = todayStats[0]?.orders ? 
      (todayStats[0].orders / (todayStats[0].orders + await Order.countDocuments({ orderStatus: 'Pending' }))) * 100 : 0;

    const [newCustomers, lastMonthCustomers, lowStock] = visitStats;
    const customerGrowth = lastMonthCustomers ? ((newCustomers - lastMonthCustomers) / lastMonthCustomers) * 100 : 0;

    // Calculer le taux de conversion
    const totalVisitors = await Visit.countDocuments({ date: { $gte: today } });
    const conversionRate = totalVisitors ? (todayStats[0]?.orders / totalVisitors) * 100 : 0;

    // Envoyer la réponse JSON
    res.json({
      revenue: currentRevenue,
      revenueGrowth: parseFloat(revenueGrowth.toFixed(2)),
      orders: todayStats[0]?.orders || 0,
      orderCompletionRate: parseFloat(orderCompletionRate.toFixed(2)),
      newCustomers,
      customerGrowth: parseFloat(customerGrowth.toFixed(2)),
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      lowStock
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques en temps réel:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const exportData = async (req, res) => {
  try {
    const { type } = req.params;
    const { startDate, endDate } = req.query;

    // Vérifiez si startDate et endDate sont fournis
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Les dates de début et de fin sont requises' });
    }

    // Validez les formats de date
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Format de date invalide' });
    }

    // Vérifiez que la date de fin est postérieure à la date de début
    if (end < start) {
      return res.status(400).json({ message: 'La date de fin doit être postérieure à la date de début' });
    }

    let data;

    switch (type) {
      case 'orders':
        data = await Order.find({
          createdAt: {
            $gte: start,
            $lte: end
          }
        }).populate('user', 'name email');
        break;
      case 'customers':
        data = await User.find({
          createdAt: {
            $gte: start,
            $lte: end
          }
        });
        break;
      default:
        return res.status(400).json({ message: 'Type d\'export invalide' });
    }

    // Vérifiez s'il y a des données à exporter
    if (data.length === 0) {
      return res.status(404).json({ message: 'Aucune donnée trouvée pour la période spécifiée' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erreur lors de l\'export des données:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les produits les plus vendus
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" }, // $unwind pour décomposer le tableau products dans le schéma Order
      {
        $group: {
          _id: "$products.product", // Group by product ID
          sales: { $sum: "$products.quantity" } // Sum the quantities
        }
      },
      { $sort: { sales: -1 } }, // Sort by sales in descending order
      { $limit: 10 }, // Limit to top 10 products
      {
        // $lookup pour joindre les informations de la collection products en utilisant le champ _id 
        $lookup: {
          from: "products", // Collection à joindre
          localField: "_id", // Local field is the product ID
          foreignField: "_id", // Foreign field is the product ID in the products collection
          as: "productInfo" // Alias for the joined data
        }
      },
      {
        $project: {
          _id: 1,
          sales: 1,
          name: { $arrayElemAt: ["$productInfo.name", 0] }, // Get the product name
          images: { $arrayElemAt: ["$productInfo.images", 0] } 
        }
      }
    ]);

    res.json(topProducts);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits les plus vendus:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Récupérer les produits en rupture de stock  
const getLowStock = async (req, res) =>{
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select('name stock images')
      .sort({ stock: 1 })
      .limit(10);

    res.json(lowStockProducts);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en rupture de stock:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

// Récupérer les statistiques des clients
const getCustomerStats = async (req, res) => {
  try {
    const [newCustomers, returningCustomers, inactiveCustomers] = await Promise.all([
      // Nouveaux clients (derniers 30 jours)
      User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }),
      // Clients fidèles (plus de 2 commandes)
      Order.aggregate([
        {
          $group: {
            _id: "$user",
            orderCount: { $sum: 1 } // Calcule le nombre de commandes par utilisateur
          }
        },
        {
          $match: {
            orderCount: { $gt: 2 } // Filtre les utilisateurs ayant plus de 2 commandes
          }
        },
        {
          $count: "count" // Compte le nombre d'utilisateurs fidèles
        }
      ]),
      // Clients inactifs (pas de commande depuis 90 jours)
      User.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "user",
            as: "orders"
          }
        },
        {
          $addFields: {
            lastOrderDate: { $max: "$orders.orderDate" }
          }
        },
        {
          $match: {
            lastOrderDate: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $count: "inactiveCount" // Compte le nombre d'utilisateurs inactifs
        }
      ])
    ]);

    res.json([
      {
        name: "Nouveaux clients",
        value: newCustomers
      },
      {
        name: "Clients fidèles",
        value: returningCustomers[0]?.count || 0
      },
      {
        name: "Clients inactifs",
        value: inactiveCustomers[0]?.inactiveCount || 0
      }
    ]);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques clients:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


module.exports = {
  getVisitors,
  getCustomerActivity,
  getRecentOrders,
  getRealTimeStats,
  getSales,
  getLowStock,
  getTopProducts,
  getCustomerStats,
  exportData
};