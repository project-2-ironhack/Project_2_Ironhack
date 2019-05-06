const bbvaService = require('../services/bbva.service');
const Query = require('../models/query.model');

module.exports.display = (req,res,next) => {    
  Query.findById(req.params.id)
  .then(query => {
    if (query) { 
      const promises = query.graphs.map((graph) => {
        return bbvaService.getData({min: '201501', max: '201502'})
      })

      Promise.all(promises)
        .then((queries) => {
          const graphs = queries.map((info, i) => {
          return Object.assign( req.body.graphs[i],{data:JSON.stringify(info)})});
          res.render('dashboard/list', { dashboard:true, graphs })
        })
        .catch(error => next(error))

    } else {
      res.redirect('/set')
    }
  })
  .catch(error => next(error));
}

