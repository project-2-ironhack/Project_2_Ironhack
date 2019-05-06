const bbvaService = require('../services/bbva.service');
const Query = require('../models/query.model');

module.exports.display = (req,res,next) => {    
  Query.findById(req.params.id)
  .then(query => {
    if (query) { 
      const promises = query.graph.map((graph) => {
        return bbvaService.getData({min: query.minDate, max: query.maxDate}, query.zipCode )
      })

      Promise.all(promises)
        .then((queries) => {
          console.log(queries.length)
          const graphs = queries.map((info, i) => {
            return Object.assign( query.graph[i],{data:JSON.stringify(info)})
          });
          res.render('dashboard/list', { dashboard:true, graphs })
        })
        .catch(error => next(error))

    } else {
      res.redirect('/set')
    }
  })
  .catch(error => next(error));
}

