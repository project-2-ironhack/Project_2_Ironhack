// esta pagina hay que estructurarla bien
require('dotenv').config()
const BBVA_AUTH = process.env.BBVA_API


const axios = require('axios')
const bbvaApi = require('../api/bbva.api')
// const qs = require('qs')

// change this


module.exports.getBbbvaData = (req,res,next) => {
  const params = req.body.params
  const bbvaTokenCall = new bbvaApi.BbvaTokenCall(BBVA_AUTH)
  axios(bbvaTokenCall)
    .then(response => {
      const accessToken = response.data['access_token']
      const tokenType = response.data['token_type']
      const bbvaApiCall = new bbvaApi.BbvaApiCall(accessToken,tokenType,params)
      return axios(bbvaApiCall)
        .then(response => res.json(response.data))
    })
    .catch(next)
}


module.exports.display = (req,res,next) => {
  console.log(req.body)
  res.render('dashboard/list', {dashboard:true, params:JSON.stringify(req.body)})
}
