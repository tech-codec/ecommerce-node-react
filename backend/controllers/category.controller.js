const Category = require('../models/Category')



exports.createCategory = async (req, res) => {

    try{
        const listMotCle = req.body.listMotCle
        const category = new Category({name:req.body.name, listMotCle:listMotCle, image:req.file !== null ? req.file.path : ""});
        await category.save();
        res.status(201).json(category);
    }catch(error){
        res.status(500).json({message:"Une erreur s'est produit lors de la création de la catégorie"})
    }
   
};


exports.getAllCategories = async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
};


exports.getcategory = async (req, res)=>{
    try{
        const category = await Category.findById(req.params.id)
        if(!category) res.status(404).json({message: "la catégorie n'existe pas"})
        res.status(200).json(category)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }
}


exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, {name:req.body.name, listMotCle:req.body.listMotCle, image:req.file !== null ? req.file.path : ""}, {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true});
        res.json(updatedCategory);
    }catch(error){
        res.status(500).json({message:"la catégorie n'a pas été modifier"})
    }
    
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, listMotCle } = req.body;
  
    try {
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      if (req.file) {
        // Si une nouvelle image est téléchargée, supprimez l'ancienne image et mettez à jour avec la nouvelle image
        if (category.image) {
          fs.unlinkSync(category.image); // Supprimez l'ancienne image du serveur
        }
        category.image = req.file.path; // Mettez à jour avec le chemin de la nouvelle image
      }
  
      category.name = name;
      category.listMotCle = JSON.parse(listMotCle); // Parsez la liste des mots-clés si nécessaire
  
      await category.save();
  
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).send('la catégorie a été supprimé');
};


