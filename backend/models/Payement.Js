const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        amount: Number,
        method: String,
        status: String,
        transactionDate: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Payment', paymentSchema);