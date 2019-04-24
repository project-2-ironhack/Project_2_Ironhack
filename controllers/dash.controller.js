// esta pagina hay que estructurarla bien
const BBVA_AUTH = process.env.BBVA_API


const axios = require('axios')
const bbvaApi = require('../api/bbva.api')
// const qs = require('qs')

// change this


module.exports.getBbbvaData = (req,res,next) => {
  const params = req.query
  const bbvaTokenCall = new bbvaApi.BbvaTokenCall(BBVA_AUTH)
    axios(bbvaTokenCall)
      .then(response => {
        const accessToken = response.data['access_token']
        const tokenType = response.data['token_type']
        const bbvaApiCall = new bbvaApi.BbvaApiCall(accessToken,tokenType,params)
        return axios(bbvaApiCall)
          .then(response => res.send(response.data))
      })
      .catch(next)
}


module.exports.display = (req,res,next) => {
  res.render('dashboard/list',{dashboard:true})
}
