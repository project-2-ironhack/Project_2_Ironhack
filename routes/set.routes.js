const express = require('express')
const router = express.Router()
const setController = require('../controllers/set.controller')

router.get('/',setController.create)
router.post('/', setController.settingUp)
router.post('/:id', setController.settingUpdate)
// Colocar el controlador del edit y el doedit. 

module.exports = router