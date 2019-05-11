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
  }], 
  userId: { type: mongoose.Types.ObjectId, ref: 'User' }

},{ timestamps: true });

const Query = mongoose.model('Query', queryModel);

module.exports = Query;
