const express = require('express')

const {upload} = require('../utils/upload.image')

const {verifyToken,isAdmin, isAdminAndEmployer} = require("../milddleware/auth")

const {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct} = require('../controllers/product.controller')


const router = express.Router()

router.post('/',verifyToken, isAdminAndEmployer,upload.array('images', 4), createProduct)
router.get('/',getAllProducts)
router.get('/:id', getProduct)
router.put('/:id',verifyToken, isAdmin, upload.array('images', 4), updateProduct)
router.delete('/:id',verifyToken, isAdmin, deleteProduct)


module.exports = router