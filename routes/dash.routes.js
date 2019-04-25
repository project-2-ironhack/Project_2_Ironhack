const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')

router.post('/', dashController.display)
router.get('/getData',dashController.getBbbvaData)

module.exports = router