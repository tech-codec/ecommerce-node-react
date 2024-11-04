const express = require('express')

const {register, login, logout, requestPasswordReset, resetPassword, activateAccount} = require('../controllers/auth.controller')


const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:token', activateAccount);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);


module.exports = router
