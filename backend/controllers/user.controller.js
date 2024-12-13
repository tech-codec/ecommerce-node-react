const User = require('../models/User')
const { registerErrors } = require('../utils/errors.util')


exports.getAllUsers = async (req, res)=>{
    //const users = await User.find().populate('roles').select('-password')
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
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


// exports.updateUser = async (req, res)=>{
//     const {id} = req.params
//     const {name,firstName, phoneNumber, email, bio, roles} = req.body


//     try{
//         image = req.file !== null ? req.file.path : ""
//         const userUpdate = await User.findByIdAndUpdate(id, {name, email, image:image, bio, roles}, {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true}).select('-password')
        
//         if(!userUpdate) res.status('404').json({message:"utilisateur non trouvé"})
        
//         res.status(200).json(userUpdate)

//     }catch(error){
//         console.log(error);
//         res.status(500).json({message:"Erreur du serveur"})
//     }
// }


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, firstName, phoneNumber, email, bio, roles } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const updatedData = {
            name: name || user.name,
            firstName: firstName || user.firstName,
            phoneNumber: phoneNumber || user.phoneNumber,
            email: email || user.email,
            bio: bio || user.bio,
            roles: roles ? JSON.parse(roles) : user.roles
        };

        if (req.file) {
            updatedData.image = req.file.path;
            // Optionally, delete the old image file here if needed
        } else {
            updatedData.image = user.image;
        }

        const userUpdate = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: true
        }).select('-password');

        res.status(200).json(userUpdate);
    } catch (error) {
        const erros = registerErrors(error)
        res.status(500).json(erros);
    }
};


exports.addUser = async (req, res) => {
    const { name, firstName, phoneNumber, email, bio, roles, password } = req.body;

    try {
        const adddData = {
            name: name,
            firstName: firstName,
            phoneNumber: phoneNumber,
            email: email,
            bio: bio,
            roles: JSON.parse(roles),
            password: password
        };

        if (req.file) {
            adddData.image = req.file.path;
            // Optionally, delete the old image file here if needed
        } 
        const newUser = new User(adddData);
        const savedUser = await newUser.save();

        res.status(200).json(savedUser);
    } catch (error) {
        const erros = registerErrors(error)
        res.status(500).json(erros);
    }
};



exports.updateStateUser = async (req, res)=>{
    const {id} = req.params
    const {isActive} = req.body

    console.log(isActive)

    try{

        const userUpdate = await User.findByIdAndUpdate(
            id, 
            {isActive},
            {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true}
        ).select('-password')

        if(!userUpdate) res.status('404').json({message:"utilisateur non trouvé"})

        res.status(200).json(userUpdate)
    }catch(error){
        res.status('500').json({error:"utilisateur non trouvé sur le serveur"})
    }
}


exports.adminUpdatePassWord = async (req, res)=>{
    const {id} = req.params
    const {password, confirmPassword} = req.body
    if (password.length < 6) {
        return res.status(400).json({ passwordLength: "Le mot de passe doit avoir au mois 6 caractères" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ confirmPasswordError: "Les mots de passe ne correspondent pas" });
    }

    try{
        const user = await User.findById(id)
        user.password = password
        await user.save()
        res.status(200).json({message:"Le mot de passe à été rénitialisé avec succè"})
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};



