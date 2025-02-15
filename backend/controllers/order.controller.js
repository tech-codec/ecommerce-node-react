const Notification = require('../models/Notification');
const Order = require('../models/Order');

// controllers/order.controller.js
exports.getOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id).populate('products.product').populate('user');
      if (!order) {
        return res.status(404).json({ message: "La commande n'existe pas" });
      }
      res.status(200).json(order);
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  };

exports.getAllOrdersByUser = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user.id }).populate('products.product').populate('user').sort({createdAt:-1});
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message: error})
    }
};

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate('products.product').populate('user').sort({createdAt: -1});
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message: error})
    }
};


// Action pour mettre à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Vérifier si le statut de la commande est valide
    if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
        return res.status(400).send('Invalid order status');
    }

    // Vérifier si req.order est défini
    if (!req.order) {
        return res.status(400).json({message: "Order not found in request"});
    }

    // Vérifier si l'utilisateur est le propriétaire de la commande
    if (req.order.user.toString() === req.user.id) {
        // Le client peut annuler la commande s'il est le propriétaire
        if (orderStatus !== 'Cancelled') {
            return res.status(403).json({onlyUser:'Tu peux seulement annuler une commande si tu es propriétaire'});
        }
    } 
    // Vérifier si l'utilisateur a les rôles nécessaires
    else if (!req.user.roles.some(role => ['admin', 'employer'].includes(role.name))) {
        // Seuls les administrateurs et les employés peuvent mettre à jour le statut autre que 'Cancelled'
        return res.status(403).json({onlyauthenticate: "vous n'avez pas le droit de modifier le statut d'une commande"});
    }

    try {
        // Mettre à jour le statut de la commande
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true}
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Vérifier si la commande existe
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
    
        // Supprimer la commande par son ID
        await Order.findByIdAndDelete(id);
    
        // Trouver la notification liée à la commande
        const notification = await Notification.findOne({ order: id });
        
        // Vérifiez si la notification existe avant de la supprimer
        if (notification) {
            await Notification.findByIdAndDelete(notification._id);
        }
        
        // Envoyer la réponse une fois que tout est terminé
        res.status(204).json({ message: 'La commande et la notification associée ont été supprimées.' });
    } catch (error) {
        // En cas d'erreur, envoyer une réponse d'erreur
        res.status(500).json({ error: error.message });
    }
};