const express = require('express')
const router = express.Router()
const setController = require('../controllers/set.controller')
const secure = require('../middlewares/secure.mid.js');

router.get('/', secure.isAuthenticated, setController.create)
router.post('/', secure.isAuthenticated, setController.settingUp)
router.post('/:id', secure.isAuthenticated, setController.settingUpdate)
// Colocar el controlador del edit y el doedit. 

module.exports = router