require('dotenv').config()
const what = process.env.npm_config_what || 'Restaurants'
const postalCode = require('./../data/postalCodes');
const lugares = require('./../data/establecimientos').places
//?$: npm run seeds -what=something

// if(what === 'PC'){
  console.log(`Okey, dude, we will search ${postalCode.pc.length} postal codes from Madrid.`);
  const importPlaces = require('./getPlaces').importPlaces
  // importPlaces(postalCode.pc, what)
  lugares.map(e=>{
    importPlaces(postalCode.pc, e.google)
  })
// } else {
  // const importZipCodes = require('./getZipCodes').importZipCodes
  // importZipCodes(postalCode.pc)
// }