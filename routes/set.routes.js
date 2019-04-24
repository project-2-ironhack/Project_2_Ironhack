const express = require('express')
const router = express.Router()
const setController = require('../controllers/set.controller')

router.get('/',setController.create)
router.post('/', setController.redirectDashboard)
// Colocar el controlador del edit y el doedit. 

module.exports = router