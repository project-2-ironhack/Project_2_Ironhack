const axios = require('axios')
const qs = require('qs')

// change this
const BBVA_AUTH = 'YXBwLmJidmEuaXJvbmhhY2s6aTdsNkp5UzhsQk4kYUpMR1RTa29UNDIzdyRWcXhnQk9pJDFGNVJjQGYkVDZJZip4YiRBbW0laFJqZFh0cVRRQg=='
const bbvaTokenCall = {
  method: 'POST',
  headers: { 
    'content-type': 'application/json',
    'authorization': `Basic ${BBVA_AUTH}`
  },
  url:'https://connect.bbva.com/token?grant_type=client_credentials'
}
const bbvaApiCall = {
  
}


module.exports.setGraphs = (req,res,next) => {
  res.render('setDashboard/form')
}

module.exports.paintGraphs = (req,res,next) => {
    axios(bbvaApiCall)
      .then(response => res.send(response.data))
      .catch(next)
}