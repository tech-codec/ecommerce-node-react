const express = require('express')

const {deleteOrder, getAllOrdersByUser, getOrder,getAllOrders, updateOrderStatus } = require('../controllers/order.controller')
const { verifyToken, isAdminAndEmployer, isAdmin } = require('../milddleware/auth')
const { loadOrder } = require('../milddleware/loadOrder')



const router = express()

router.get('/', verifyToken, isAdminAndEmployer, getAllOrders)
router.get('/by-user-id/:id', verifyToken,  getAllOrdersByUser)
router.get('/:id', verifyToken, getOrder)
router.put('/:id', verifyToken, loadOrder, updateOrderStatus)
router.delete('/:id', verifyToken, isAdmin, deleteOrder)


module.exports = router

