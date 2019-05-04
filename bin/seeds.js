require('dotenv').config()
const what = process.env.npm_config_what || 'Restaurants'
const postalCode = require('./../data/postalCodes');


if(what == 'PC'){
  console.log(`Okey, dude, we will search ${postalCode.pc.length} postal codes from Madrid.`);
  const importPlaces = require('./getPlaces').importPlaces
  importPlaces(postalCode.pc, what)
} else {
  const importZipCodes = require('./getZipCodes').importZipCodes
  importZipCodes(postalCode.pc)
}