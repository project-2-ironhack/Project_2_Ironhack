const bbvaService = require('../services/bbva.service');

// esta constante podríamos sacarla fuera

const apiParams = [{
  name: 'AvgTransactionsByAgeRange',
  apiParam : 'ages.genders'
},
{
name: 'AvgTransactionsValueByPeriod',
apiParam : 'none'
},
{
  name: 'MerchantsByCategories',
  apiParam : 'categories'
},
{
  name: 'EstSalesByCategory',
  apiParam : 'categories'
},
{
  name: 'SalesEvolutionCategories',
  apiParam : 'categories'
}, 
{
  name: 'AvgTransactionsValueByCategory',
  apiParam : 'categories'
},  
]

module.exports.display = (req,res,next) => {
 
  const promises = req.body.graphs.map((graph) => {
    const apiParamNeeded = apiParams.filter(graphParams => graphParams.name === graph.type)
    console.log(apiParamNeeded[0].apiParam)
    return bbvaService.getData({min: '201501', max: '201512'},apiParamNeeded[0].apiParam)
  })

  Promise.all(promises)
    .then((queries) => {
      const graphs = queries.map((info, i) => {
        return Object.assign( req.body.graphs[i],{data:JSON.stringify(info)})});
      res.render('dashboard/list', { dashboard:true, graphs })
    })
    .catch(error => next(error))
}
