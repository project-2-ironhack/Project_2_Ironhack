const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({  
  name:{
    type: String,
  },
  geometry: { //location
    type: { type: String },
    coordinates: [Number]
  }, 
  properties : { 
    address : String,
    googleId: String,
    priceLevel: String,
    types : String,
    postalCode: String,
    city: String,
    country: String,
    icon: String
  }
},{ timestamps: true });

placeSchema.index({ geometry: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
