const axios = require('axios')
const GOOGLE_API = process.env.PLACES_API_KEY
// const settingModel = require('./../helpers/mapsParser').ZipCodesSchema
module.exports.getZC = where => {
  importZC = (data, code) => {
    const zipcodes = mappingZipCodes(data, code)
      return  ZC.create(zipCode)
        .then(imported => imported ? imported.length : 0)
  }
  return (
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API}=${where}+Madrid`)
      .then(response => {
        importZC(response.data.result)
          .then(status=>status)
          .catch(err => console.error(err))        
      })
  )
}

mappingZipCodes = (data, name) => {
  return data.map( obj => {
    return new ZC({
      name: name,
      geometry: { //location
        location_type: obj.geometry.location_type,
        location: [
          obj.geometry.location.lng,
          obj.geometry.location.lat,
        ],
        bounds: {
          northeast: [
            obj.geometry.bounds.northeast.lng,
            obj.geometry.bounds.northeast.lat,
          ],
          southwest: [
            obj.geometry.bounds.southwest.lng,
            obj.geometry.bounds.southwest.lat,
          ]
        }
      },      
    })
  })
}