// const mongoose = require('mongoose');
// const Places = require('./../models/places.model');
const axios = require('axios')
const GOOGLE_API = 'AIzaSyC6ZCMc68-WlyzGtqkjraw3nroaEYqcIww'

const output = process.env.npm_config_output || 'json'
const what = process.env.npm_config_what || 'restaurants'
const where = process.env.npm_config_where || 28045

// ** Get data from GoogleMaps. 
axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}?query=${what}+in+${where}&fields=geometry&key=${GOOGLE_API}`)
// axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {
//     params: {
//       query : `${what}+in+${where}`,
//       fields : 'geometry',
//       key : GOOGLE_API,
//     }
//   })
  .then(function (response) {
    // console.log(response.data)
    console.log(`Status ${response.data.status}, we found:  ${response.data.results.length} elements`);
  })
  .catch(function (error) {
    console.log(error);
  });




// const geojson = [
//   {
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [
//         38.909671288923,
//         -77.034084142948
//       ]
//     },
//     "properties": {
//       "phoneFormatted": "(202) 234-7336",
//       "phone": "2022347336",
//       "address": "1471 P St NW",
//       "city": "Washington DC",
//       "country": "United States",
//       "crossStreet": "at 15th St NW",
//       "postalCode": "20005",
//       "state": "D.C."
//     }
//   },
// ];



// // ** Connect to database. 
// require('./config/db.config');

// // ** Delete & Import to Mongo
// Places.deleteMany()
//     .then(() => Places.create(geojson))
//     .then(geojson => {
//         console.log(`Created ${geojson.length} places`)
//         mongoose.connection.close()
//     })
