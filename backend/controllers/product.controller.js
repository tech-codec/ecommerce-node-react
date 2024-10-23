const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
    try{

        const {name, description, old_price, new_price, category, stock} = req.body

        image = req.file !== null ? req.file.path : ""
       
        const product = new Product({name, description, old_price, new_price,stock, category, image:image});
        await product.save();
        res.status(201).json(product);
        
    }catch(error){
        res.status(500).json({message:"Une erreur s'est produit lors de la création du produit"})
    }
   
};




exports.getAllProducts = async (req, res)=>{
    const products = await Product.find().populate('category')
    res.status(200).json(products)
}


exports.getProduct = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('category')
        if(!product) res.status(404).json({message: "le produit n'existe pas"})
        res.status(200).json(product)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }
}


exports.updateProduct = async (req, res)=>{
    const {id} = req.params
    
    try{
        const {name, description, old_price, new_price,stock, category} = req.body

        image = req.file !== null ? req.file.path : ""
        const productUpdate = await Product.findByIdAndUpdate(id, {name, description, old_price, new_price,stock, category, image:image}, {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true})
        
        if(!productUpdate) res.status('404').json({message:"produit non trouvé"})
        
        res.status(200).json(productUpdate)

    }catch(error){
        console.log({message:"erreur sur le serveur"});
        res.status(500).json({message:"Erreur du serveur"})
    }
}


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(204).send();
};