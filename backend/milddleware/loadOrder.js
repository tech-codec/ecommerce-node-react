const Order = require("../models/Order");

exports.loadOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        req.order = order;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};