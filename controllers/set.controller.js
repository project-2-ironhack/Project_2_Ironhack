const Graph = ['Barras', 'Pie', 'etc']
const kinds = ['Supermarket', 'Coffee', 'Shops']
const Categories = ['creditCard', 'somethingElse', 'etc']

const mongoose = require('mongoose');
const ZipCodes = require('./../models/zipCodes.model');

module.exports.create = (req,res,next) => {
  ZipCodes.find()
    .then(arrZipCodes => {
      zipCodes = arrZipCodes.map(e => e.name)
      res.render('set/form', { Graph, kinds, Categories, zipCodes})
    })
    .catch(next)
}
