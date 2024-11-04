const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyRole = require('../middleware/verifyRole');
const verifyOrderOwner = require('../middleware/verifyOrderOwner');

// Route pour mettre à jour le statut d'une commande

router.put('/order/:id/status', verifyOrderOwner, async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
    return res.status(400).send('Invalid order status');
  }

  if (req.order.user.toString() === req.user.id) {
    // Le client peut annuler la commande s'il est le propriétaire
    if (orderStatus !== 'Cancelled') {
      return res.status(403).send('You can only cancel your order');
    }
  } else if (!req.user.roles.includes('admin') && !req.user.roles.includes('employee')) {
    // Seuls les administrateurs et les employés peuvent mettre à jour le statut autre que 'Cancelled'
    return res.status(403).send('Unauthorized');
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
