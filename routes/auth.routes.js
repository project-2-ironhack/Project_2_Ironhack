const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/register', authController.register);
router.post('/register', authController.doRegister)

//actualizar si da tiempo a ES6
module.exports = router;