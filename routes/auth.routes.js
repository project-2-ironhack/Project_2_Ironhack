const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/register', authController.register);
router.post('/register', authController.doRegister)

router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/login', authController.doLogin)

//actualizar si da tiempo a ES6
module.exports = router;