const axios = require('axios')
const mongoose = require('mongoose');

const GOOGLE_API = process.env.PLACES_API_KEY
const ZC = require('./../models/zipCodes.model');

// const settingModel = require('./../helpers/mapsParser').ZipCodesSchema
module.exports.importZipCodes  = list => {  
  // ** Connect to database. 
  require('./../config/db.config')

  const promises = list.map(zc => {
    return getZC(zc)
      .then(status => console.log(`Imported: ${status} for ${zc}`))
      .catch(err => console.error('pringado'))
  })

  Promise.all(promises).then(() => mongoose.connection.close())
}

const getZC = where => {
  importZC = (data, code) => {
    const zipcodes = mappingZipCodes(data, code)
      return  ZC.create(zipcodes)
        .then(imported => imported ? imported.length : 0)
        .catch(err => console.log(err))
  }
  return (
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API}&address=${where}+Madrid`)
      .then(response => importZC(response.data.results, where))
      .catch(err => console.log(err))
  )
}

const mappingZipCodes = (data, name) => {
  return data.map( obj => {
    return new ZC({
      name: name,
      location: { //location
        type: 'Point',
        coordinates: [
          obj.geometry.location.lng,
          obj.geometry.location.lat,
        ],
      },
        // bounds: {
      northeast: {
        type: 'Point',
        coordinates :[
          obj.geometry.bounds.northeast.lng,
          obj.geometry.bounds.northeast.lat,
        ],
      },
      southwest: {
        type: 'Point',
        coordinates: [
          obj.geometry.bounds.southwest.lng,
          obj.geometry.bounds.southwest.lat,
        ]
      },
      properties : {
        googleId: obj.place_id,
        types : obj.types[0],
        city: 'Madrid',
        country: 'Spain',
      }
        // }
    })
  })
}