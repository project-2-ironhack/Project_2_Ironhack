const graphCategory = ['Barras', 'Pie', 'etc']

module.exports.create = (req,res,next) => {
  res.render('set/form', { categories: graphCategory})
}

module.exports.redirectDashboard = (req, res, next) => {
    res.send(req.body)
}