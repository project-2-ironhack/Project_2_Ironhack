const express = require('express')
const router = express.Router()
const setController = require('../controllers/set.controller')

router.get('/',setController.create)


module.exports = router