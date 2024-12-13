const express = require('express')

const {upload} = require('../utils/upload.image')

const{verifyToken, isAdmin, isAdminAndEmployer} = require("../milddleware/auth")

const {getAllUsers, getUser, updateUser, deleteUser, updateStateUser, adminUpdatePassWord, addUser } = require('../controllers/user.controller')


const router = express.Router()


router.get('/',verifyToken,isAdminAndEmployer,getAllUsers)
router.post('/',verifyToken,isAdminAndEmployer,upload.single("image"),addUser)
router.get('/:id', verifyToken,getUser)
router.put('/:id',verifyToken,upload.single("image"), updateUser)
router.put('/admin/:id',verifyToken,isAdmin,upload.single("image"), updateUser)
router.put('/state/:id', verifyToken, isAdmin, updateStateUser)
router.put('/admin-update-password/:id', verifyToken, isAdmin, adminUpdatePassWord)
router.delete('/:id',verifyToken,isAdmin,deleteUser)


module.exports = router