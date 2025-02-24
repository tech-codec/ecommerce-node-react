const Product = require('../models/Product')


exports.createProduct = async (req, res) => {
    const { name, description, old_price, new_price, category, stock, status } = req.body;

    try {
        const addData = {
            name: name,
            description: description,
            old_price: old_price,
            new_price: new_price,
            category: category,
            stock: stock,
            status: status,
            images: []
        };

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                addData.images.push(file.path);
            });
        } else {
            // Ajouter une image par défaut si aucune image n'est téléchargée
            addData.images.push("/public/shared/uploads/images/no-image-product.jpg");
        }

        const newProduct = new Product(addData);
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.createProduct = async (req, res) => {
    const { name, description, old_price, new_price, category, stock, status } = req.body;

    try {
        const addData = {
            name: name,
            description: description,
            old_price: old_price,
            new_price: new_price,
            category: category,
            stock: stock,
            status: status,
            images: []
        };

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                addData.images.push(file.path);
            });
        } else {
            // Ajouter une image par défaut si aucune image n'est téléchargée
            addData.images.push("/public/shared/uploads/images/no-image-product.jpg");
        }

        const newProduct = new Product(addData);
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res)=>{
    try{
        const products = await Product.find().populate('category').sort({createdAt: -1})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({ message: 'Une erreur est survenue ', error })
    }
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


exports.updateProduct = async (req, res) => {
    const { name, description, old_price, new_price, category, stock, status } = req.body;

    const {id} = req.params

    try {

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvée" });
        }

        const updateData = {
            name: name || product.name,
            description: description || product.description,
            old_price: old_price || product.old_price,
            new_price: new_price || product.new_price,
            category: category || product.category,
            stock: stock || product.stock,
            status: status || product.status,
            images: product.images
        };

        if (req.files && req.files.length > 0) {
            updateData.images = []; // Réinitialiser les images si de nouvelles images sont téléchargées
            req.files.forEach(file => {
                updateData.images.push(file.path);
            });
        }

        const productUpdate = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: true
        });
        res.status(200).json(productUpdate);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(204).send("produit supprimé avec succès");
};