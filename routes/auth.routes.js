const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/register',authController.register);





//actualizar si da tiempo a ES6
module.exports = router;