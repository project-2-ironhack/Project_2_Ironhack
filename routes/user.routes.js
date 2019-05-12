const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const secure = require('../middlewares/secure.mid.js');

router.get('/profile', secure.isAuthenticated, userController.profile);
router.post('/profile', secure.isAuthenticated, userController.doProfile);

module.exports = router;