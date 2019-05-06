const bbvaService = require('../services/bbva.service');

module.exports.display = (req,res,next) => {
  // {
  //   config: {
  //     zipCode: "28001",
  //     min_date: "02",
  //     max_date: "12",
  //     type: "Coffee"
  //   },
  //   graph: [
  //     "Barras",
  //     "etc"
  //   ]
  // }
  const promises = req.body.graphs.map((graph) => {
    return bbvaService.getData({min: `2015${req.body.min_date}`, max: `2015${req.body.max_date}`})
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
