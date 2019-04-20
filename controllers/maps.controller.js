const createError = require('http-errors');

module.exports.dashboard = (req, res, next) => {
  res.render('maps/mapbox')
}