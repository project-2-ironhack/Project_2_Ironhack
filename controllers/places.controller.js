const createError = require('http-errors');
const mongoose = require('mongoose');
const Place = require('../models/places.model');
const constants = require('../constants')

const PLACE_CATEGORIES = constants.PLACE_CATEGORIES

module.exports.list = (req, res, next) => {
  Place.find()
    .then(places => res.render('places/list', {places, showGoogleMap:true}))
    .catch(error => next(error));
}


module.exports.create = (req, res, next) => {
  const place = new Place();
  res.render('places/form', {categories: PLACE_CATEGORIES, place, showGoogleMap:true })
}

module.exports.doCreate = (req, res, next) => {
  const place = new Place({
    name: req.body.name,
   type: req.body.type,
    geometry: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
  })
  place.save()
    .then(() => res.redirect(`/places/${place._id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('places/form', {
          place,
          categories: PLACE_CATEGORIES,
          ...error, 
          showGoogleMap:true
        })
      } else {
        next(error)
      }
    });
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      if (place) {
        res.render('places/form', {
          place,
          categories: PLACE_CATEGORIES
        })
      } else {
        next(createError(404, 'Place not found'))
      }
    })
    .catch(error => next(error));
}

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;
  req.body.geometry = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  }
  Place.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((place) => {
      if (place) {
        res.redirect(`/places/${place._id}`)
      } else {
        next(createError(404, 'place not found'))
      } 
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const place = new Place({ ...req.body, _id: id })
        place.isNew = false
        res.render('places/form', {
          categories: PLACE_CATEGORIES,
          place,
          ...error
        })
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Place.findByIdAndDelete(id)
    .then((place) => {
      if (place) {
        res.redirect('/places')
      } else {
        next(createError(404, 'Place not found'))
      }
    })
    .catch((error) => next(error))
}

module.exports.editCoordinates = (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      if (place) {
        res.json(place.geometry.coordinates)
      } else {
        //I hope not get into this... 
        next(createError(404, 'Place not found'))
      }
    })
    .catch(next)
}

module.exports.coordinates = (req, res, next) => {
  Place.find()
    .then((places) => res.json(places.map(u => u.geometry)))
    .catch(next)
}

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404,'Places not found'))
  } else {
  Place.findById(id)
    .then(place => {
      if (place) {
        res.render('places/details', { place })        
        // .catch(next) // what is this catch doing here?
      } else {
        next(createError(404, 'place not found'))
      }
    })
    .catch(error => next(error));
  }
}