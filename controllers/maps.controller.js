const createError = require('http-errors');
const mongoose = require('mongoose');
const Place = require('../models/places.model');
// environment variable is not working. :(
const token =  process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoidmFscm9iIiwiYSI6ImNqdXBvZjF1cDExZ3U0NXBwZm93NnRmYjMifQ.tgbRWqyCJLXEAgqBb2hPNA'  

module.exports.dashboard = (req, res, next) => {
  Place.find()
    .then(placeData => {
      const places = encodeURI(JSON.stringify(placeData))
      res.render('maps/mapbox', {places, showMap: true, token})
    })
    .catch(error => next(error));  
}