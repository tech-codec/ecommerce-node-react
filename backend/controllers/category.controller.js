const Category = require('../models/Category');
const Product = require('../models/Product');



exports.createCategory = async (req, res) => {

  const { name, description, listMotCle } = req.body;

  try {
    const adddData = {
      name: name,
      description: description,
      listMotCle: JSON.parse(listMotCle),
    };

    if (req.file) {
      adddData.image = req.file.path;
      // Optionally, delete the old image file here if needed
    }
    const newCategory = new Category(adddData);
    const savedCategory = await newCategory.save();

    res.status(200).json(savedCategory);
  } catch (error) {
    //const erros = registerErrors(error)
    return res.status(500).json({ error: error.message })
  }

};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }); // 1 for ascending order
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue', error });
  }
};


exports.getcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(404).json({ message: "la catégorie n'existe pas" })
    res.status(200).json(category)
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
}


exports.updateCategory = async (req, res) => {

  const { id } = req.params;
  const { name, description, listMotCle } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    const updatedData = {
      name: name || category.name,
      description: description || category.description,
      listMotCle: listMotCle ? JSON.parse(listMotCle) : category.listMotCle
    };

    if (req.file) {
      updatedData.image = req.file.path;
      // Optionally, delete the old image file here if needed
    } else {
      updatedData.image = category.image;
    }

    const categoryUpdate = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    });

    res.status(200).json(categoryUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


exports.deleteCategory = async (req, res) => {
  try {
      const { id } = req.params;

      // Vérifier si la catégorie existe
      const category = await Category.findById(id);
      if (!category) {
          return res.status(404).json({ message: "Catégorie non trouvée" });
      }

      // Supprimer la catégorie par son ID
      await Category.findByIdAndDelete(id);

      // Trouver tous les produits ayant cette catégorie
      const products = await Product.find({ category: id });

      // Pour chaque produit, mettre à jour la catégorie à null ou une valeur par défaut
      const updatedProducts = products.map(product => {
          product.category = null; // ou une valeur par défaut
          return product.save();
      });

      // Attendre que toutes les mises à jour soient terminées
      await Promise.all(updatedProducts);

      // Envoyer la réponse une fois que tout est terminé
      res.status(204).json({ message: 'La catégorie a été supprimée et les produits ont été mis à jour.' });
  } catch (error) {
      // En cas d'erreur, envoyer une réponse d'erreur
      res.status(500).json({ error: error.message });
  }
};


