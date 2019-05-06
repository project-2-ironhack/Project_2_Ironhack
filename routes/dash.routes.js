const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')

router.get('/', (req, res, next) => res.redirect('/set'))
router.get('/:id', dashController.display)
// router.post('/getData',dashController.getBbbvaData)

module.exports = router