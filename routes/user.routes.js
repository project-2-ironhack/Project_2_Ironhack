const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const secure = require('../middlewares/secure.mid.js');

const storage = require('../config/storage.config');

router.get('/profile', secure.isAuthenticated, userController.profile);
router.post('/profile', secure.isAuthenticated, storage.single('avatar'), userController.doProfile);

module.exports = router;