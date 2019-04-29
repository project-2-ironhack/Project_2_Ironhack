const Graph = ['Barras', 'Pie', 'etc']
const kinds = ['Supermarket', 'Coffee', 'Shops']
// no podemos pasarle espacios los atributos porque entonces no funciona el stringify bien
const Categories = ['creditCard', 'somethingElse', 'etc']

module.exports.create = (req,res,next) => {
  res.render('set/form', { Graph, kinds, Categories})
}
// estoy creo que quitarlo estaria bien
// module.exports.redirectDashboard = (req, res, next) => {
//     res.send(req.body)
// }