const express = require('express')

const {upload} = require('../utils/upload.image')

const {getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/user.controller')


const router = express.Router()


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id',upload.single("image"), updateUser)
router.delete('/:id', deleteUser)


module.exports = router