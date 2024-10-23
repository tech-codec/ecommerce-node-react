const Role = require('../models/Role');


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
    const roles = await Role.find();
    res.json(roles);
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
    const { id } = req.params;
    await Role.findByIdAndDelete(id);
    res.status(204).send('le rôle a été supprimé');
};
