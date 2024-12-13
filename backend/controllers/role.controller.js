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
      const roles = await Role.find().sort({ createdAt: -1 }); // 1 for ascending order
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue', error });
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
    try{
        const updatedRole = await Role.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedRole);
    }catch(error){
        res.status(500).json({message:"le rôle n'a pas été modifier"})
    }
    
};

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        // Supprimer le rôle par son ID
        await Role.findByIdAndDelete(id);

        // Trouver tous les utilisateurs
        const users = await User.find();

        // Pour chaque utilisateur, supprimer le rôle de leur tableau de rôles
        for (const user of users) {
            user.roles = user.roles.filter(r => r.toString() !== id);
            console.log(user.roles)
            await user.save();
        }

        // Envoyer la réponse une fois que tout est terminé
        res.status(204).send('Le rôle a été supprimé et les utilisateurs ont été mis à jour.');
    } catch (error) {
        // En cas d'erreur, envoyer une réponse d'erreur
        res.status(500).send('Erreur lors de la suppression du rôle et de la mise à jour des utilisateurs.');
    }
};
