const bbvaService = require('../services/bbva.service');

// module.exports.getBbbvaData = (req,res,next) => {
//   const params = req.body.params
//   const bbvaTokenCall = new bbvaApi.BbvaTokenCall(BBVA_AUTH)
//   axios(bbvaTokenCall)
//     .then(response => {
//       const accessToken = response.data['access_token']
//       const tokenType = response.data['token_type']
//       const bbvaApiCall = new bbvaApi.BbvaApiCall(accessToken,tokenType,params)
//       return axios(bbvaApiCall)
//         .then(response => res.json(response.data))
//     })
//     .catch(next)
// }


module.exports.display = (req,res,next) => {
  const promises = req.body.graphs.map((graph) => {
    return bbvaService.getData({min: '201501', max: '201501'})
  })

  Promise.all(promises)
    .then((queries) => {
      const data = queries.map((info, i) => {
        console.log(info)
        return Object.create(info)});
      console.log(data);
      res.render('dashboard/list', { dashboard:true, data:data })
    })
    .catch(error => next(error))
}
