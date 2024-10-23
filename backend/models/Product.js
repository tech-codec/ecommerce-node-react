const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },
        description: {
            type: String,
            required: true
        },
        new_price: {
            type: Number,
            required: true
        },
        old_price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        stock: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('Product', productSchema);