// ** Mongoose Schema
const mongoose = require('mongoose');
const Places = require('./../models/places.model');
// ** Connect to database. 
require('./../config/db.config') //r u sure?

// ** Delete & Import to Mongo
module.exports.importMongo = (data) => {
    return  (
      Places.create(data)
        .then(imported => {
          return imported ? imported.length : 0
        })
    )
}

