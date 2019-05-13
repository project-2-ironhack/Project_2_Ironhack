const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dash.controller')
const secure = require('../middlewares/secure.mid.js');

router.get('/', secure.isAuthenticated, (req, res, next) => res.redirect('/set'))
router.get('/:id', secure.isAuthenticated, dashController.display)
// router.post('/getData',dashController.getBbbvaData)

module.exports = router