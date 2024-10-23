const express = require('express')

const {getRole, getAllRoles, updateRole, deleteRole, createRole } = require('../controllers/role.controller')

const router = express.Router()

router.get('/', getAllRoles)
router.get('/:id', getRole)
router.post('/', createRole)
router.put('/:id', updateRole)
router.delete('/:id', deleteRole)

module.exports = router