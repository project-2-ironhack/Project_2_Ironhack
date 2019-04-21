// esta pagina hay que estructurarla bien


const axios = require('axios')
const bbvaApi = require('./../api/bbva.api')
const qs = require('qs')

// change this
const BBVA_AUTH = 'YXBwLmJidmEuaXJvbmhhY2s6aTdsNkp5UzhsQk4kYUpMR1RTa29UNDIzdyRWcXhnQk9pJDFGNVJjQGYkVDZJZip4YiRBbW0laFJqZFh0cVRRQg=='
const bbvaTokenCall =  {
  method: 'POST',
  headers: { 
    'content-type': 'application/json',
    'authorization': `Basic ${BBVA_AUTH}`
  },
  url:'https://connect.bbva.com/token?grant_type=client_credentials'
}
class BbvaApiCall {
  constructor (accessToken,tokenType,type,maxDate,minDate) {
    this.method = 'GET',
    this.headers = {
      'authorization': `${tokenType} ${accessToken}`,
      'content-type': 'application/json'
    }
    //tengo que cambiar el zipcode en bruto por una variable
    this.url = `https://apis.bbva.com/paystats_sbx/4/zipcodes/28002/origin_distribution?origin_type=${type}&max_date=${maxDate}&min_date=${minDate}`
  }
}


module.exports.setGraphs = (req,res,next) => {
  bbvaApi.getToken().then(data=>{
    return data
  })
  res.render('setDashboard/form')
}

module.exports.paintGraphs = (req,res,next) => {
  const {originType,maxDate,minDate} = req.query
    axios(bbvaTokenCall)
      .then(response => {
        console.log(originType,maxDate,minDate)
        const accessToken = response.data['access_token']
        const tokenType = response.data['token_type']
        const bbvaApi = new BbvaApiCall(accessToken,tokenType,originType,maxDate,minDate)
        console.log(bbvaApi)
        return axios(bbvaApi)
          .then(response => res.send(response.data))
      })
      .catch(next)
}