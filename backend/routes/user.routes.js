const express = require('express')

const {upload} = require('../utils/upload.image')

const{verifyToken, isAdmin} = require("../milddleware/auth")

const {getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/user.controller')


const router = express.Router()


router.get('/',verifyToken,isAdmin,getAllUsers)
router.get('/:id', verifyToken,getUser)
router.put('/:id',verifyToken,upload.single("image"), updateUser)
router.delete('/:id',verifyToken,isAdmin,deleteUser)


module.exports = router