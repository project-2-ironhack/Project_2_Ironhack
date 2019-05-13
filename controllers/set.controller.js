const placesObj = require('./../data/establecimientos').places
// const categories = require('./../constants').API_PARAMS.map(e=>e.name)
const categories = require('./../constants').API_PARAMS
const mongoose = require('mongoose');
const ZipCodes = require('./../models/zipCodes.model');
const Query = require('../models/query.model');
const url = require('url');    

module.exports.create = (req,res,next) => {
  ZipCodes.find()
    .then(arrZipCodes => {
      res.render('set/form', {
        placesObj, 
        categories, 
        zipCodes : arrZipCodes.map(e => e.name),
        showForm: true
      })
    })
    .catch(next)
}

module.exports.settingUp = (req, res, next) => {
    console.log(req.body.establecimiento)
    const query = new Query({
      zipCode: req.body.config.zipCode,
      minDate: '2015' + req.body.config.min_date,
      maxDate: '2015' + req.body.config.max_date,
      establecimiento: req.body.establecimiento,
      graph: req.body.graph.type, 
      userId: req.session.passport.user
    })
    query.save()
      .then(() => res.redirect(`/dashboard/${query._id}`))
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('set/form', {
            query,
            kinds, categories, zipCodes,
            ...error, 
            showGoogleMap:true,
            showForm: true
          })
        } else {
          next(error)
        }
      });
}

module.exports.settingUpdate = (req, res, next) => {
  Query.findByIdAndUpdate(req.params.id, req.body, )
    .then((query) => {
      if (query) {
        res.redirect(`/dashboard/${query._id}`)
      } else {
        next(createError(404, 'Cant update'))
      }
    })
    .catch((error) => {
      console.log(error)
      if (error instanceof mongoose.Error.ValidationError || true) {
        res.redirect(url.format({
          pathname:`/dashboard/${query._id}`,
          query: {
            error: 'Zip Code Invalid'
          }
        }));
      } else {
        next(error);
      }
    })
}
