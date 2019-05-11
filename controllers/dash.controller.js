const bbvaService = require('../services/bbva.service');
const Query = require('../models/query.model');
const token =  process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoidmFscm9iIiwiYSI6ImNqdXBvZjF1cDExZ3U0NXBwZm93NnRmYjMifQ.tgbRWqyCJLXEAgqBb2hPNA'  
const Place = require('../models/places.model');
const ZipCodes = require('./../models/zipCodes.model');
const apiParams = require('./../constants').API_PARAMS

module.exports.display = (req,res,next) => {    
  
  Query.findById(req.params.id)
    .then(query => {
      if (query) { 
        const promises = query.graph.map((graph) => {
          const apiParamNeeded = apiParams.find(graphParams => graphParams.name === graph)
          return bbvaService.getData({min: query.minDate, max: query.maxDate}, apiParamNeeded.apiParam, query.zipCode )
        })
        

        const className = query.graph.length > 2 ? 'col-6' : 'col-12'
        


        Promise.all(promises)
          .then((queries) => {
            console.log(query)
            const graphs = queries.map((info, i) => {
              //graphType ponerlo bonito
              const graphType = { type: query.graph[i]}
              return Object.assign( graphType,{data:JSON.stringify(info)})
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
                      token,
                      className
                    })
                  })
              })
          })
      } else {
        res.redirect('/set')
      }
    })
    .catch(error => next(error));
}