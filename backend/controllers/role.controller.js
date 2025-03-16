const Role = require('../models/Role');
const User = require('../models/User');


exports.createRole = async (req, res) => {
    try{
        const roleExists = await Role.findOne({ name: req.body.name });
        if(!roleExists){
            const role = new Role(req.body);
            await role.save();
            res.status(201).json(role);
        }
    }catch(error){
        res.status(500).json({message:"Une erreur s'est produit lors de la création du rôle"})
    }
   
};


exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ name: { $ne: "admin" } }) // Exclure "admin"
            .sort({ createdAt: -1 });

        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue", error });
    }
};
  


exports.getRole = async (req, res)=>{
    try{
        const role = await Role.findById(req.params.id)
        if(!role) res.status(404).json({message: "le rôle n'existe pas"})
        res.status(200).json(role)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }
}


exports.updateRole = async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifier si le rôle existe
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).send("Rôle non trouvé");
        }

        // Vérifier si le rôle est "admin" ou "employer"
        if (["admin", "employer","client"].includes(role.name.toLowerCase())) {
            return res.status(403).send(`Le rôle '${role.name}' ne peut pas être modifié.`);
        }

        // Mettre à jour le rôle
        const updatedRole = await Role.findByIdAndUpdate(id, req.body, { new: true });

        res.json(updatedRole);
    } catch (error) {
        console.error("Erreur lors de la modification du rôle :", error);
        res.status(500).json({ message: "Le rôle n'a pas pu être modifié." });
    }
};


exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si le rôle existe
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).send("Rôle non trouvé.");
        }

        // Empêcher la suppression du rôle "admin"
        if (["admin", "employer","client"].includes(role.name.toLowerCase())) {
            return res.status(403).send(`Le rôle '${role.name.toLowerCase()}' ne peut pas être supprimé.`);
        }

        // Vérifier si un utilisateur connecté possède ce rôle
        const connectedUser = await User.findOne({ roles: id, connected: true });
        if (connectedUser) {
            return res.status(403).send("Ce rôle ne peut pas être supprimé car il est attribué à un utilisateur connecté.");
        }

        // Supprimer le rôle
        await Role.findByIdAndDelete(id);

        // Supprimer ce rôle chez les utilisateurs
        await User.updateMany(
            { roles: id },
            { $pull: { roles: id } }
        );

        res.status(200).send("Le rôle a été supprimé et les utilisateurs ont été mis à jour.");
    } catch (error) {
        console.error("Erreur suppression rôle:", error);
        res.status(500).send("Erreur lors de la suppression du rôle et de la mise à jour des utilisateurs.");
    }
};

