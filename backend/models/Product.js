const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 1050,
            trim: true
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
        status: {
            type: Boolean,
            default: true
        },
        images: {
            type: [
                {
                    type: String,
                    default: "/public/shared/uploads/images/no-image-product.jpg"
                }
            ],
            validate: [arrayLimit, '{PATH} exceeds the limit of 4'] // Optional: To limit the number of images
        },
        category: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category', 
            //default: null
            required: true 
        },
        stock: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

function arrayLimit(val) {
    return val.length <= 4;
}

module.exports = mongoose.model('Product', productSchema);
