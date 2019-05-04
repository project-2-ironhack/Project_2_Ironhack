const mongoose = require('mongoose')

const zipCodesSchema = new mongoose.Schema({
  place_id: String,
  geometry: { //location
    location_type: String,
    location: [Number],
    bounds: {
      northeast: [Number],
      southwest: [Number]
    }
  },
},{ timestamps: true })

zipCodesSchema.index({geometry: '2dsphere'})

const zipCode = mongoose.model('ZipCode', zipCodesSchema)

module.exports = zipCode