const bbvaService = require('../services/bbva.service');

module.exports.display = (req,res,next) => {
  const promises = req.body.graphs.map((graph) => {
    return bbvaService.getData({min: '201501', max: '201512'})
  })

  Promise.all(promises)
    .then((queries) => {
      const data = queries.map((info, i) => {
        console.log(info[0])
        return Object.assign( req.body.graphs[i],{data:info})});
      console.log(data)
      res.render('dashboard/list', { dashboard:true, data:data })
    })
    .catch(error => next(error))
}
