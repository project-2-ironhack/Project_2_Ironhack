const createError = require('http-errors');
const token = 'pk.eyJ1IjoidmFscm9iIiwiYSI6ImNqdXBvZjF1cDExZ3U0NXBwZm93NnRmYjMifQ.tgbRWqyCJLXEAgqBb2hPNA'
module.exports.dashboard = (req, res, next) => {
  res.render('maps/mapbox', {showMap: true, token})
}