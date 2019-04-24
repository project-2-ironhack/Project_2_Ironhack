const mongoose = require('mongoose');
const Places = require('./../models/places.model');
const axios = require('axios')
const GOOGLE_API = 'AIzaSyC6ZCMc68-WlyzGtqkjraw3nroaEYqcIww'

// ** Get data from GoogleMaps. 
axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
    params: {
      input : 'coffee%20shop%20Australia',
      inputtype : 'textquery',
      fields : 'geometry',
      key : 'AIzaSyC6ZCMc68-WlyzGtqkjraw3nroaEYqcIww',
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });





// // ** Connect to database. 
// require('./config/db.config');

// // ** Delete & Import to Mongo
// Places.deleteMany()
//     .then(() => Places.create(geojson))
//     .then(geojson => {
//         console.log(`Created ${geojson.length} places`)
//         mongoose.connection.close()
//     })
