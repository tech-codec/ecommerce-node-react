const Notification = require('../models/Notification');
const { findByIdAndDelete } = require('../models/Order');


exports.getAllNotification = async (req, res) => {

    try {
        const notification = await Notification.find().sort({ createdAt: -1 })
        res.json(notification)
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue', error });
        console.log('erreur notification: ', error)
    }
}


exports.markAllRead = async (req, res) => {

    try {

        const allNotification = await Notification.find()

        const updatedAllNotification = allNotification.map(n => {
            n.isRead = true; 
            return n.save();
        });

        // Attendre que toutes les mises à jour soient terminées
        await Promise.all(updatedAllNotification);
        
        console.log('les notif mis à true: ', updatedAllNotification)
        res.status(200).json(updatedAllNotification)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

exports.deleteNotification = async (req, res)=>{
    const {id} = req.params
    try{
        await Notification.findByIdAndDelete(id)
        res.status(200).send()
    }catch(error){
        res.status(500).json({message: error})
    }
}