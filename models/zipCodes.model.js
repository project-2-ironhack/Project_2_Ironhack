const mongoose = require('mongoose')

const zipCodesSchema = new mongoose.Schema({
  name: String,
  geometry: { //location
    location_type: String,
    location: [Number],
    bounds: {
      northeast: [Number],
      southwest: [Number]
    }
  },
  properties: {
    googleId: String,
    types : String,
    city: String,
    country: String,
  }
},{ timestamps: true })

zipCodesSchema.index({geometry: '2dsphere'})

const zipCode = mongoose.model('ZipCode', zipCodesSchema)

module.exports = zipCode