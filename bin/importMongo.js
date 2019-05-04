// ** Mongoose Schema
const mongoose = require('mongoose');
const Places = require('./../models/places.model');
const ZC = require('./../models/zipCodes.model');

// ** Delete & Import to Mongo
module.exports.importPlaces = (data) => {
    return Places.create(mapping(data))
        .then(imported =>  imported ? imported.length : 0)
}

module.exports.importZC = (data) => {
    const zipCode = new ZC({
      
    })
    return  ZC.create(zipCode)
      .then(imported => imported ? imported.length : 0)
}

mapping = (data) => {
  pc = (string) => string.match(/28(\d+){3}/)[0] 
  return data.map( e => {
    return {
      name : e.name,
      type: "Feature",      
      geometry: {
        type: 'Point',
        coordinates: [
          //* les damos la vuelta...  
          e.geometry.location.lat,
          e.geometry.location.lng,
        ]
      }, 
      properties : {
        address: e.formatted_address,
        googleId: e.id,
        priceLevel : e.price_level,
        types : e.types,
        //* Extraemos el código postal
        postalCode: pc(e.formatted_address),
        city: 'Madrid',
        country: 'Spain',
        icon: e.icon
      }
    }
  })
}