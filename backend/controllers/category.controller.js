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
    const categories = await Category.find();
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

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).send('la catégorie a été supprimé');
};


