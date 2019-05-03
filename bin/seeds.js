require('dotenv').config()
const postalCode = require('./postalCodes');
const establecimiento = process.env.npm_config_what || 'Restaurants'
const timeout = 2000;

const importMongo = require('./importPlaces').importMongo
const getPlaces = require('./getPlaces').getPlaces


console.log(`Okey, dude, we will search ${postalCode.pc.length} postal codes from Madrid.`);

// ** Connect to database. 
require('./../config/db.config') //r u sure?

postalCode.pc.forEach((where, index) => {
  setTimeout(function(){
    getPlaces(where, establecimiento, importMongo)
      .then(status => console.log(`Imported: ${status} for ${where}`))
  }, index * timeout * 3);    
})

