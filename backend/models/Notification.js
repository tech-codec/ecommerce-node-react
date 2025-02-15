const mongoose = require("mongoose")


const notificationShema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
         },
         order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        totalProduct: {
            type: Number,
            required: true
          },
        subtotalprice: {
            type: Number,
            require: true
          },
        totalPrice: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Notification = mongoose.model("Notification", notificationShema)

module.exports = Notification