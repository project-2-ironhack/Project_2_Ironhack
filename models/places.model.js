const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({  
  name:{
    type: String,
  },
  type : {
    type: [String],
    enum: ['coffeshop', 'bookstore', 'FeatureCollection'],
    required: true   
  },
  geometry: { //location
    type: { type: String },
    coordinates: [Number]
  }, 
  propertiesSchema : { 
    phoneFormatted : String,
    phone: String,
    address: String,
    city: String,
    country: String,
    crossStreet: String,
    postalCode: String,
    state: String,
  }
},{ timestamps: true });

placeSchema.index({ geometry: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
