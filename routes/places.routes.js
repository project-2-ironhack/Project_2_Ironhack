const express = require('express');

const router = express.Router();

const placesController =  require('../controllers/places.controller');

// CREATE
router.get('/new', placesController.create);
router.post('/', placesController.doCreate);

// READ
router.get('/', placesController.list);
router.get('/coordinates', placesController.coordinates);
router.get('/:id/coordinates', placesController.editCoordinates);
router.get('/:id', placesController.details);

// UPDATE
router.get('/:id/edit', placesController.edit);
router.post('/:id', placesController.doEdit);

// DELETE
router.post('/:id/delete', placesController.delete);

module.exports = router;