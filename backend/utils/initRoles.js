// initRoles.js
const Role = require('../models/Role');

exports.initRoles = async () => {
   
    const roles = ['client', 'fournisseur', 'admin'];

    for (const roleName of roles) {
        const roleExists = await Role.findOne({ name: roleName });
        if (!roleExists) {
            const role = new Role({ name: roleName });
            await role.save();
            console.log(`Role ${roleName} created`);
        }
    }

};

