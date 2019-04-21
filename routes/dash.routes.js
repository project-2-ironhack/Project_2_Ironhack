const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')

router.get('/',dashController.setGraphs)
router.get('/getGraphics',dashController.paintGraphs)

module.exports = router