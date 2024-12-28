const mongoose = require('mongoose')
const { trim } = require('validator')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 150,
            trim: true
        },
        description: {
            type: String,
            maxlength: 500
        },

        image: {
            type: String,
            default: "/public/shared/uploads/images/default-banner.jpg"
        },
        listMotCle: {
            type: [String],
            required: true,
            validate: [
                // {
                //     validator: function (v) {
                //         return v.length >= 10 && v.length <= 150;
                //     },
                //     message: 'The list must have between 10 and 150 items.'
                // },
                {
                    validator: function (v) {
                        return v.every(item => item.trim().length >= 2 && item.trim().length <= 100);
                    },
                    message: 'Each string in the list must be between 2 and 100 characters long.'
                }
            ]
        }


    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Category', categorySchema)


