// ** Mongoose Schema
const mongoose = require('mongoose');
const Places = require('./../models/places.model');
  

// ** Delete & Import to Mongo
module.exports.importMongo = (data) => {
    return  (
      Places.create(data)
        .then(imported => {
          return imported ? imported.length : 0
        })
    )
}

