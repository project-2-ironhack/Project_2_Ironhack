const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')

router.get('/',dashController.display)
router.get('/getData',dashController.getBbbvaData)

module.exports = router