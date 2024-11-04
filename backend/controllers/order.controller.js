const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { products, totalPrice,totalProduct, user } = req.body;
    const order = new Order({ user, products, totalPrice,totalProduct });
    await order.save();
    res.status(201).json(order);
};


exports.getOrder = async (req,res)=>{
    const { id } = req.params;

    // if (!req.order.user.toString() === req.user.id) {
    //     return res.status(403).send("ce n'est pas votre commande");
        
    // } else if (!req.user.roles.includes('admin') && !req.user.roles.includes('employee')) {
    //     // Seuls les administrateurs et les employés peuvent voir la commande'
    //     return res.status(403).send('Unauthorized');
    // }

    try{
        const order = await Order.findById(req.params.id).populate('products.product')
        if(!order) res.status(404).json({message: "la commande n'existe pas"})
        res.status(200).json(order)
    }catch(error){
         // Gestion des erreurs
         console.error(error);
         res.status(500).json({ message: 'Erreur du serveur' });
    }

}

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
};

// exports.updateOrder = async (req, res) => { 
//     const { id } = req.params;
//     const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(updatedOrder);
// };

// Action pour mettre à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
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
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(204).send();
};
