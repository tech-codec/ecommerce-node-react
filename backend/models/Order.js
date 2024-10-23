const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true }
            }
        ],
        total: { type: Number, required: true },
        status: { type: String, required: true, default: 'pending' },
        date: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
