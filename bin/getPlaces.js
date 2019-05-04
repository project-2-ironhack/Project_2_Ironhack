const axios = require('axios')
const mongoose = require('mongoose');

const GOOGLE_API = process.env.PLACES_API_KEY
const Place = require('./../models/places.model');
const timeout = 2000;

module.exports.importPlaces = (list, type) => {  
  // ** Connect to database. 
  require('./../config/db.config') //r u sure?

  const promises = list.map(zc => {
    return getPlaces(zc, type)
      .then(status => console.log(`Imported: ${status} for ${zc}`))
  })

  Promise.all(promises).then(() => mongoose.connection.close())
}

const getPlaces = (where, what) => {  
  // ** Delete & Import to Mongo
  importPlaces = (data) => {
    return Place.create(mappingPlaces(data))
        .then(imported =>  imported ? imported.length : 0)
        .catch(err => console.error(err))
  }

  return (
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${what}+in+${where}+in+Madrid&fields=geometry&key=${GOOGLE_API}`)
      .then(sleeper(timeout))
      .then(response => {
        let data = response.data.results;
        console.log(`Status: ${response.data.status}`)
        console.log(`we found ${data.length} elements for ${where} in the first page`)
        if(response.data.next_page_token) {
          return  (
            moreData(response.data.next_page_token)
              .then(sleeper(timeout))//sleeper para el tercer request
              .then(newData => {
                data = [...data, ...newData.data]
                console.log(`we found ${data.length} elements for ${where} in the second page`)
                if(newData.nxtToken){
                  return  (
                    moreData(newData.nxtToken)
                      .then(newData=>{
                        data = [...data, ...newData.data]                                    
                        console.log(`we found ${data.length} elements for ${where} in the third page`)
                        return importPlaces(data)
                      })    
                  )
                } else {
                  return importPlaces(data)
                }
              })
          )
        } else {
          return importPlaces(data)
        }
      })
  )
}

const moreData = nxtToken => {
  return (
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {         
      params: {pagetoken : nxtToken, key : GOOGLE_API,}
    })
      .then(response => {
        return {data: response.data.results, nxtToken: response.data.next_page_token}
      })
      .catch(err => console.log(err))
  )
}

/* 
* There is a short delay between when a next_page_token is issued, and when it will become valid. 
* Requesting the next page before it is available will return an INVALID_REQUEST response. 
* Retrying the request with the same next_page_token will return the next page of results.
 */
const  sleeper = delay => {
  return (x) => new Promise(resolve => setTimeout(() => resolve(x), delay));
}

const mappingPlaces = data => {
  const pc = (string) => string.match(/28(\d+){3}/)[0] 
  return data.map( e => {
    return new Place({
      name : e.name,
      type: "Feature",      
      geometry: {
        type: 'Point',
        coordinates: [
          //*  Note that longitude comes first in 
          // * a GeoJSON coordinate array, not latitude.
          e.geometry.location.lng,
          e.geometry.location.lat,
        ]
      }, 
      properties : {
        address: e.formatted_address,
        googleId: e.id,
        priceLevel : e.price_level,
        types : e.types,
        postalCode: pc(e.formatted_address),
        city: 'Madrid',
        country: 'Spain',
        icon: e.icon
      }
    })
  })
}