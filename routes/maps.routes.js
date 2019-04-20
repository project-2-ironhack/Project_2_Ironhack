const express = require('express');

const router = express.Router();

const mapsController =  require('../controllers/maps.controller');

// Read
router.get('/', mapsController.dashboard)

module.exports = router;
