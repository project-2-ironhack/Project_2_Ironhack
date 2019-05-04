const mongoose = require('mongoose');

const queryModel = new mongoose.Schema({  
  zipCode: Number, 
  minDate: Number, 
  maxDate: Number, 
  establecimiento: String, 
  gráfica: [{
    type: String, 
    // enum : []
  }]
},{ timestamps: true });

const Query = mongoose.model('Query', queryModel);

module.exports = Query;
