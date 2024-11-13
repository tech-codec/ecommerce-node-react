const express = require('express')

const {verifyToken,isAdmin} = require("../milddleware/auth")

const {getRole, getAllRoles, updateRole, deleteRole, createRole } = require('../controllers/role.controller')

const router = express.Router()

router.get('/',getAllRoles)
router.get('/:id',getRole)
router.post('/',verifyToken, isAdmin, createRole)
router.put('/:id',verifyToken, isAdmin, updateRole)
router.delete('/:id',verifyToken, isAdmin, deleteRole)

module.exports = router