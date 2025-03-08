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

  const protectedCategories = ["ordinateur", "téléphone", "vêtement", "télévision"];

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send("Catégorie non trouvée");
    }

    // Vérifier si la catégorie est protégée
    if (protectedCategories.includes(category.name.toLowerCase())) {
      return res.status(403).send(`La catégorie '${category.name}' ne peut pas être modifiée.`);
    }

    const updatedData = {
      name: name || category.name,
      description: description || category.description,
      listMotCle: listMotCle ? JSON.parse(listMotCle) : category.listMotCle,
      image: req.file ? req.file.path : category.image
    };

    const categoryUpdate = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(categoryUpdate);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
      const { id } = req.params;

      // Vérifier si la catégorie existe
      const category = await Category.findById(id);
      if (!category) {
          return res.status(404).send("Catégorie non trouvée.");
      }

      // Vérifier si des produits sont liés à cette catégorie
      const productCount = await Product.countDocuments({ category: id });
      if (productCount > 0) {
          return res.status(403).send("Impossible de supprimer cette catégorie car elle est liée à un ou plusieurs produits.");
      }

      // Supprimer la catégorie
      await Category.findByIdAndDelete(id);

      res.status(200).send("La catégorie a été supprimée avec succès.");
  } catch (error) {
      console.error("Erreur suppression catégorie:", error);
      res.status(500).send("Erreur lors de la suppression de la catégorie.");
  }
};



