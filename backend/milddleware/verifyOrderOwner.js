const Order = require('../models/Order');

const verifyOrderOwner = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    
    if (order.user.toString() !== req.user.id && !req.user.roles.includes('admin') && !req.user.roles.includes('employee')) {
      return res.status(403).send('Unauthorized');
    }
    
    req.order = order;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = verifyOrderOwner;
