const axios = require('axios')
// Constantes. 
const BBVA_AUTH = process.env.BBVA_API || 'YXBwLmJidmEuaXJvbmhhY2s6aTdsNkp5UzhsQk4kYUpMR1RTa29UNDIzdyRWcXhnQk9pJDFGNVJjQGYkVDZJZip4YiRBbW0laFJqZFh0cVRRQg==' 
const TOKEN_URL = 'https://connect.bbva.com'


// internal function. 
getToken = () => {
  const postConfig =  {
    url : `${TOKEN_URL}/token`,
    method: 'POST',
    headers: { 
      'content-type': 'application/json',
      'authorization': `Basic ${BBVA_AUTH}`
    },
    params: {
      grant_type : 'client_credentials'
    },
  }
  return (
    axios(postConfig)
    .then(response => {
      return {
        token: response.data['access_token'],
        tokenType: response.data['token_type']
      }
    })
  )  
}
module.exports.marketValue = (params) =>{
  params = params || {
    // 'marketValue' :'true',
    // 'surfaceArea' :'71.5',
    // 'type' :'P',
    // 'age' :'47',
    // 'apartment' :'B',
    // 'floor' :'03',
    // 'stairCase' :'MADRID',
    // 'building' :'1',
    // 'number' :'271',
    // 'streetName' :'ALCALA',
    // 'streetType' :'CALLE',
    // 'postalCode' :'28027',
    // 'city' :'MADRID',
    // 'province' :'MADRID',
    'long' :'-3.65',
    'lat' :'40.43'
  }
  return  (
    getToken()
      .then(tokenObj => {
        const getConfig =  {
          url : 'https://apis.bbva.com/sel-sbx/v1/info',
          headers: { 
            'Authorization': `${tokenObj.tokenType} ${tokenObj.token}`,
            'Accept':'application/json', 
            'content-type': 'application/json'
          },
          params: params,
        } 
        return axios(getConfig)
          .then(response => {
            return response.data
          })
          .catch (err => `la cagaste wey ${err}`)
      })
  )
}