const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 150,
            trim: true
        },

    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Role', RoleSchema)