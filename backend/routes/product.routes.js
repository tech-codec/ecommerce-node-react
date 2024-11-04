const express = require('express')

const {upload} = require('../utils/upload.image')

const {verifyToken,isAdmin} = require("../milddleware/auth")

const {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct} = require('../controllers/product.controller')


const router = express.Router()

router.post('/',verifyToken, isAdmin,upload.single("image"), createProduct)
router.get('/',getAllProducts)
router.get('/:id', getProduct)
router.put('/:id',verifyToken, isAdmin, upload.single("image"), updateProduct)
router.delete('/:id',verifyToken, isAdmin, deleteProduct)


module.exports = router