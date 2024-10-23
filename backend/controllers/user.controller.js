const User = require('../models/User')


exports.getAllUsers = async (req, res)=>{
    const users = await User.find().populate('roles').select('-password')
    res.status(200).json(users)
}


exports.getUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id).populate('roles').select('-password')
        if(!user) res.status(404).json({message: "l'utilisateur n'existe pas"})
        res.status(200).json(user)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }
}


exports.updateUser = async (req, res)=>{
    const {id} = req.params
    const {name, email, bio, roles} = req.body


    try{
        image = req.file !== null ? req.file.path : ""
        const userUpdate = await User.findByIdAndUpdate(id, {name, email, image:image, bio, roles}, {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true}).select('-password')
        
        if(!userUpdate) res.status('404').json({message:"utilisateur non trouvé"})
        
        res.status(200).json(userUpdate)

    }catch(error){
        console.log({message:"erreur sur le serveur"});
        res.status(500).json({message:"Erreur du serveur"})
    }
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};



