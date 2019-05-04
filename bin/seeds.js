require('dotenv').config()
const what = process.env.npm_config_what || 'Restaurants'
const postalCode = require('./../data/postalCodes');
// ** Connect to database. 
require('./../config/db.config') //r u sure?

if(what != 'PC'){
  console.log(`Okey, dude, we will search ${postalCode.pc.length} postal codes from Madrid.`);
  const importPlaces = require('./getPlaces').importPlaces
  importPlaces(postalCode.pc, what)
} else {
  const importZipCodes = require('./getZipCodes').getZC
  importZipCodes(postalCode.pc)
}