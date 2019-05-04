const axios = require('axios')
const GOOGLE_API = process.env.PLACES_API_KEY
// const settingModel = require('./../helpers/mapsParser').ZipCodesSchema
module.exports.getZC = (where, how) => {
  return (
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API}=${where}+Madrid`)
      .then(response => {
        how(response.data.result)
          .then(status=>status)
          .catch(err => console.error(err))        
      })
  )
}