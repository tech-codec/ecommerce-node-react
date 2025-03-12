const Notification = require('../models/Notification')
const Order = require('../models/Order')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { registerErrors } = require('../utils/errors.util')
const Role = require('../models/Role')


exports.getAllUsers = async (req, res)=>{
    //const users = await User.find().populate('roles').select('-password')
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
    res.status(200).json(users)
}


exports.getUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id).populate('roles').select('-password')
        if(!user){
            return res.status(404).json({message: "l'utilisateur n'existe pas"})
        } 
        res.status(200).json(user)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }
}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, firstName, phoneNumber, email, bio, roles } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }

        // Vérifier si le user est protégée
        if (["techcodec","alain","pablo"].includes(user.name.toLowerCase())) {
            return res.status(403).send(`L'utilisateur '${user.name}' ne peut pas être modifiée car il est le super admin ou user de test`);
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
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        // Vérifier si le user est protégée
        if (["techcodec","alain","pablo"].includes(user.name.toLowerCase())) {
            return res.status(403).send(`L'utilisateur '${user.name}' ne peut pas être modifiée car il est le super admin ou user de test`);
        }

        const userUpdate = await User.findByIdAndUpdate(
            id, 
            {isActive},
            {new:true,upsert:true,setDefaultsOnInsert:true,runValidators:true}
        ).select('-password')

        res.status(200).json(userUpdate)
    }catch(error){
        res.status('500').send("utilisateur non trouvé sur le serveur")
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
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        // Vérifier si le user est protégée
        if (["techcodec","alain","pablo"].includes(user.name.toLowerCase())) {
            return res.status(403).send(`L'utilisateur '${user.name}' ne peut pas être modifiée car il est le super admin ou user de test`);
        }
        user.password = password
        await user.save()
        res.status(200).json({message:"Le mot de passe à été rénitialisé avec succè"})
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

exports.UpdateUserPassWord = async (req, res)=>{
    const {id} = req.params
    const {password, newPassword, confirmPassword} = req.body

    try{
        const user = await User.findById(id)
        const comp = await bcrypt.compare(password, user.password)
        if(!comp){
            return res.status(400).json({ passwordError: "Le mot de passe ne correspond pas à votre mot de passe actuel" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ newPasswordLength: "Le mot de passe doit avoir au mois 6 caractères" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ confirmPasswordError: "Les mots de passe ne correspondent pas" });
        }
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        // Vérifier si le user est protégée
        if (["techcodec","alain","pablo"].includes(user.name.toLowerCase())) {
            return res.status(403).send(`L'utilisateur '${user.name}' ne peut pas être modifiée car il est le super admin ou un user de test`);
        }
        user.password = newPassword
        await user.save()
        res.status(200).json({message:"Le mot de passe à été modifier avec succè"})
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {

        const role = await Role.findOne({name:"admin"})
        if (!role) {
            return res.status(404).send("Utilisateur ou le rôle n'a pas été trouvé" );
        }
        // Vérifier si l'utilisateur existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé" );
        }

        // Vérifier si l'utilisateur est connecté
        if (user.connected) {
            return res.status(403).send("Impossible de supprimer un utilisateur connecté.");
        }

        if(user.roles.includes(role._id)){
            return res.status(403).send("Impossible de supprimer un utilisateur avec le rôle admin.")
        }
       // Vérifier si le user est protégée
       if (["techcodec","alain","pablo"].includes(user.name.toLowerCase())) {
            return res.status(403).send(`L'utilisateur '${user.name}' ne peut pas être supprimer car il est le super admin ou un user de test`);
        }

        // Supprimer l'utilisateur
        await User.findByIdAndDelete(id);

        // Supprimer les notifications et commandes associées
        await Notification.deleteMany({ user: id });
        await Order.deleteMany({ user: id });

        res.status(200).send("L'utilisateur a été supprimé avec ses notifications et commandes." );
    } catch (error) {
        console.error("Erreur suppression user:", error);
        res.status(500).send("Erreur lors de la suppression de l'utilisateurs.");
    }
};




