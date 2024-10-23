const express = require('express')

//const multer  = require('multer')

//const upload = multer()

const {upload} = require('../utils/upload.image')

const {createCategory, updateCategory, deleteCategory, getAllCategories, getcategory} = require('../controllers/category.controller')


const router = express.Router()

router.post('/',upload.single("image"), createCategory)
router.get('/',getAllCategories)
router.get('/:id',getcategory)
router.put('/:id',upload.single("image"), updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router