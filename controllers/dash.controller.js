const bbvaService = require('../services/bbva.service');

module.exports.display = (req,res,next) => {
 
  const promises = req.body.graphs.map((graph) => {
    return bbvaService.getData({min: '201501', max: '201512'})
  })

  Promise.all(promises)
    .then((queries) => {
      const graphs = queries.map((info, i) => {
        return Object.assign( req.body.graphs[i],{data:JSON.stringify(info)})});
      // console.log(data)
      res.render('dashboard/list', { dashboard:true, graphs })
    })
    .catch(error => next(error))
}
