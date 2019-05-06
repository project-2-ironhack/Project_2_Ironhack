const bbvaService = require('../services/bbva.service');
const Query = require('../models/query.model');
const token =  process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoidmFscm9iIiwiYSI6ImNqdXBvZjF1cDExZ3U0NXBwZm93NnRmYjMifQ.tgbRWqyCJLXEAgqBb2hPNA'  
const Place = require('../models/places.model');
const ZipCodes = require('./../models/zipCodes.model');

module.exports.display = (req,res,next) => {    
  Query.findById(req.params.id)
  .then(query => {
    if (query) { 
      const promises = query.graph.map((graph) => {
        return bbvaService.getData({min: query.minDate, max: query.maxDate}, query.zipCode )
      })

      Promise.all(promises)
        .then((queries) => {
          const graphs = queries.map((info, i) => {
            return Object.assign( query.graph[i],{data:JSON.stringify(info)})
          });
          ZipCodes.findOne({name:query.zipCode})
            .then((zipCode)=>{
              console.log(zipCode)
              const zipCodeCoords = encodeURI(JSON.stringify(zipCode))
              Place.find({'properties.postalCode' : zipCode.name})
                .then(placeData => {
                  const places = encodeURI(JSON.stringify(placeData))
                  res.render('dashboard/list', { 
                    showMap: true,
                    dashboard:true, 
                    graphs, 
                    places, 
                    zipCodeCoords, 
                    token
                  })
                })
                .catch(next)
            })
            .catch(next)
        })
        .catch(next)

    } else {
      res.redirect('/set')
    }
  })
  .catch(error => next(error));
}

