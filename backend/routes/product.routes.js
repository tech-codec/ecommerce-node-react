const express = require('express')

const {upload} = require('../utils/upload.image')

const {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct} = require('../controllers/product.controller')


const router = express.Router()

router.post('/',upload.single("image"), createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.put('/:id',upload.single("image"), updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router