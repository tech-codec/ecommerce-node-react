const express = require('express')

const {getAllNotification, markAllRead, deleteNotification} = require('../controllers/notification.controller')
const { verifyToken, isAdmin } = require('../milddleware/auth')


const router = express.Router()


router.get('/', getAllNotification)
router.put('/mark-all-read', markAllRead)
router.delete('/:id', verifyToken, isAdmin)


module.exports = router