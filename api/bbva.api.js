const axios = require('axios')
// Constantes. 
const BBVA_AUTH = process.env.BBVA_API || 'YXBwLmJidmEuaXJvbmhhY2s6aTdsNkp5UzhsQk4kYUpMR1RTa29UNDIzdyRWcXhnQk9pJDFGNVJjQGYkVDZJZip4YiRBbW0laFJqZFh0cVRRQg==' 
const TOKEN_URL = 'https://connect.bbva.com'


const tokenConfig =  {
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

module.exports.getToken = () => {
  return  axios(tokenConfig)
          .then(response => {
            return {
              token: response.data['access_token'],
              tokenType: response.data['token_type']
            }
          })
}