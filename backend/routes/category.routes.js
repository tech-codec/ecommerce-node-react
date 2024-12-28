const express = require('express')

const {verifyToken, isAdmin, isAdminAndEmployer} = require("../milddleware/auth")

const {upload} = require('../utils/upload.image')

const {createCategory, updateCategory, deleteCategory, getAllCategories, getcategory} = require('../controllers/category.controller')


const router = express.Router()

router.post('/',verifyToken, isAdminAndEmployer,upload.single("image"), createCategory)
router.get('/',getAllCategories)
router.get('/:id',getcategory)
router.put('/:id',verifyToken, isAdmin,upload.single("image"), updateCategory)
router.delete('/:id',verifyToken, isAdmin, deleteCategory)

module.exports = router