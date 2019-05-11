const mongoose = require('mongoose')

const zipCodesSchema = new mongoose.Schema({
  name: String,
  location : {
    type: { type: String },
    coordinates: [Number],
  },    
    // bounds: {
  northeast: {
    type: { type: String },
    coordinates: [Number],
  },
  southwest: {
    type: { type: String },
    coordinates: [Number],
  },
    // }
  properties: {
    googleId: String,
    types : String,
    city: String,
    country: String,
    gdpPerCapita: String,
    population: String,
    unemploymentRate: String
  }
},{ timestamps: true })

zipCodesSchema.index({geometry: '2dsphere'})

const zipCode = mongoose.model('ZipCode', zipCodesSchema)

module.exports = zipCode