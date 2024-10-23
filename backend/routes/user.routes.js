const express = require('express')

const {getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/user.controller')


const router = express.Router()


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router