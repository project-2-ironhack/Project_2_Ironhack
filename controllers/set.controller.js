const Graph = ['Barras', 'Pie', 'etc']
const kinds = ['Supermarket', 'Coffee', 'Shops']
const Categories = ['Credit Card', 'Something else', 'etc']

module.exports.create = (req,res,next) => {
  res.render('set/form', { Graph, kinds, Categories})
}
// estoy creo que quitarlo estaria bien
// module.exports.redirectDashboard = (req, res, next) => {
//     res.send(req.body)
// }