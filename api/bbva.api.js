const axios = require('axios')
// Constantes. 
const TOKEN_URL = 'https://connect.bbva.com'


// internal function. 
class BbvaTokenCall   {
  constructor(auth) {
    this.method = 'POST',
    this.headers = { 
      'content-type': 'application/json',
      'authorization': `Basic ${auth}`
    },
    this.url = 'https://connect.bbva.com/token'
    this.params = {
      'grant_type':'client_credentials'
    }
  }
}
class BbvaApiCall {
  constructor (accessToken, tokenType, params) {
    this.method = 'GET',
    this.headers = {
      'authorization': `${tokenType} ${accessToken}`,
      'accept': 'application/json' //seguro que es content-type?
    }
    //tengo que cambiar el zipcode en bruto por una variable
    this.url = 'https://apis.bbva.com/paystats_sbx/4/zipcodes/28002/origin_distribution'
    this.params = {
        'origin_type' : 'zipcodes',
        'min_date' : params['min_date'],
        'max_date' : params['max_date']
    }
  }
}

module.exports.BbvaTokenCall = BbvaTokenCall
module.exports.BbvaApiCall = BbvaApiCall