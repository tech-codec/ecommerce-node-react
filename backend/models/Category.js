const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique:true,
            require: true
        },
        image: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        listMotCle: {
            type: [String],
            require: true
        }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Category', categorySchema)


