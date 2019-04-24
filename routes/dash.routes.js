const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')

prouter.get('/getData',dashController.getBbbvaData)

module.exports = router