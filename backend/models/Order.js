const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
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
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  customerId:{type:String, require:true},
  shipping: { type: Object, required: true },
  total_details:{ type: Object, required: true },
  //delivery_status: { type: String, default: "pending" },
  payment_status: { type: String, required: true },
  orderDate: {
    type: Date,
    default: Date.now
  },
},
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
