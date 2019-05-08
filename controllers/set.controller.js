const types = ['Supermarket', 'Coffee', 'Shops']
const categories = require('./../constants').API_PARAMS.map(e=>e.name)
const mongoose = require('mongoose');
const ZipCodes = require('./../models/zipCodes.model');
const Query = require('../models/query.model');

module.exports.create = (req,res,next) => {
  ZipCodes.find()
    .then(arrZipCodes => {
      zipCodes = arrZipCodes.map(e => e.name)
      res.render('set/form', {types, categories, zipCodes})
    })
    .catch(next)
}

module.exports.settingUp = (req, res, next) => {
    // res.json(req.body)
    const query = new Query({
      zipCode: req.body.config.zipCode,
      minDate: '2015' + req.body.config.min_date,
      maxDate: '2015' + req.body.config.max_date,
      establecimiento: req.body.config.type,
      graph: req.body.graph
    })
    query.save()
      .then(() => res.redirect(`/dashboard/${query._id}`))
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('set/form', {
            query,
            kinds, categories, zipCodes,
            ...error, 
            showGoogleMap:true
          })
        } else {
          next(error)
        }
      });
}
