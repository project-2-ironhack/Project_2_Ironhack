require('dotenv').config()
const postalCode = require('./postalCodes');
const establecimiento = process.env.npm_config_what || 'Restaurants'
const timeout = 2000;

const importPlaces = require('./importMongo').importPlaces
const importZC = require('./importMongo').importZC
const getPlaces = require('./getPlaces').getPlaces
const getZipCodes = require('./getZipCodes').getZC

console.log(`Okey, dude, we will search ${postalCode.pc.length} postal codes from Madrid.`);

// ** Connect to database. 
require('./../config/db.config') //r u sure?

postalCode.pc.forEach((zc, index) => {
  setTimeout(function(){
    // getZC(zc, importZC).then(status => console.log(status ? `${zc} imported` : 'import failed'))
    getPlaces(zc, establecimiento, importPlaces)
      .then(status => console.log(`Imported: ${status} for ${zc}`))
      
  }, index * timeout * 3);    
})