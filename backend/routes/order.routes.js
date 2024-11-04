const express = require('express')

const {createOrder, deleteOrder, getOrder,getAllOrders, updateOrderStatus } = require('../controllers/order.controller')



const router = express()

router.post('/', createOrder)
router.get('/', getAllOrders)
router.get('/:id',getOrder)
router.put('/:id', updateOrderStatus)
router.delete('/:id', deleteOrder)


module.exports = router

