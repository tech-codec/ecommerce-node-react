const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },

    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Role', RoleSchema)