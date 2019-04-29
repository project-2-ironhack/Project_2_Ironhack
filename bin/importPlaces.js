// ** Mongoose Schema
const mongoose = require('mongoose');
const Places = require('./../models/places.model');
// ** Connect to database. 
require('./../config/db.config')

// ** Delete & Import to Mongo
module.exports.importMongo = (data) => {
  Places.deleteMany()
    .then(() => Places.create(data))
    .then(inside => {
        console.log(`Imported ${inside.length} places inside Mongo`)
        mongoose.connection.close()
    })
    .catch(e => console.error(e))
}
