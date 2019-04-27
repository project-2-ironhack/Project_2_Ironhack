// const mongoose = require('mongoose');
// const Places = require('./../models/places.model');
const axios = require('axios')
const GOOGLE_API = 'AIzaSyC6ZCMc68-WlyzGtqkjraw3nroaEYqcIww'

const output = process.env.npm_config_output || 'json'
const what = process.env.npm_config_what || 'restaurants'
const where = process.env.npm_config_where || 28045 //? working, but not searching with postal code
const all = process.env.npm_config_all || true //! not working || default false

//?  npm run seeds --what='Restaurants' --where=123 
/* 
* There is a short delay between when a next_page_token is issued, and when it will become valid. 
* Requesting the next page before it is available will return an INVALID_REQUEST response. 
* Retrying the request with the same next_page_token will return the next page of results.
 */
console.log(`we are looging for ${what} in ${where} and we will look for more ${all}`) 

//* Get data from GoogleMaps. 
//! Postal code not working, if i send it by params. Why?? 
// axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {
//     params: {
//       query : `${what}+in+${where}`,
//       fields : 'geometry',
//       key : GOOGLE_API,
//     }
//   })
axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}?query=${what}+in+${where}&fields=geometry&key=${GOOGLE_API}`)
  .then(response => {
    let page = response.data.results.length
    if(response.data.next_page_token) {
      console.log(response.data.next_page_token)
      console.log('looking for more page')
      axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {         
        params: {
          pagetoken : response.data.next_page_token,
          key : GOOGLE_API,
        }   
      })
        .then(nextRes => {
          page =+ nextRes.data.results.length
          if(nextRes.data.next_page_token) {
            axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {         
              params: {
                pagetoken : nextRes.data.next_page_token,
                key : GOOGLE_API,
              }   
            })            
              .then(finalRes => {
                page =+ finalRes.data.results.length            
                console.log(`Status ${finalRes.data.status}, we found:  ${page} elements in a third level`);
              })
              .catch(err=>console.error(err))
          } else {
            console.log(`Status ${nextRes.data.status}, we found:  ${page} elements in a second level`);
          }
        })
        .catch(err=>console.error(err))
    } else {
      console.log(`Status ${response.data.status}, we found:  ${page} elements, in the first level`);
    }
  })
  .catch(error => console.log(error));




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
