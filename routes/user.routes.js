const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/profile', /*secure.isAuthenticated,*/ userController.profile);
// router.post('/profile', secure.isAuthenticated, storage.single('avatar'), auth.doProfile);

module.exports = router;