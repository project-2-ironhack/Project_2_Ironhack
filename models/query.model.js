const mongoose = require('mongoose');
const zipCodes = require('./../data/postalCodes').pc
const queryModel = new mongoose.Schema({  
  zipCode: {
    type:Number, 
    enum: zipCodes
  }, 
  minDate: Number, 
  maxDate: Number, 
  establecimiento: [String], 
  graph: [{
    type: String, 
    // enum : []
  }]
},{ timestamps: true });

const Query = mongoose.model('Query', queryModel);

module.exports = Query;
