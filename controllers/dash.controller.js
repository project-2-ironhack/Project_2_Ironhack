const bbvaService = require('../services/bbva.service');
const Query = require('../models/query.model');
const token =  process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoidmFscm9iIiwiYSI6ImNqdXBvZjF1cDExZ3U0NXBwZm93NnRmYjMifQ.tgbRWqyCJLXEAgqBb2hPNA'  
const Place = require('../models/places.model');
const ZipCodes = require('./../models/zipCodes.model');
const apiParams = require('./../constants').API_PARAMS
const placesObj = require('./../data/establecimientos').places

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
            const graphs = queries.map((info, i) => {
              //graphType ponerlo bonito
              const graphType = { type: query.graph[i]}
              return Object.assign( graphType,{data:JSON.stringify(info)})
            });
            ZipCodes.findOne({name:query.zipCode})
              .then((zipCode)=>{
                const zipCodeCoords = encodeURI(JSON.stringify(zipCode))
                const ticketData = {
                  "gdp": zipCode.properties.gdpPerCapita,
                  "population": zipCode.properties.population,
                  "unemploymentRate": zipCode.properties.unemploymentRate
                }
                console.log(ticketData)
                // , 'properties.types' : query.establecimiento}
                Place.find({'properties.postalCode' : zipCode.name})
                  .then(placeData => {
                    console.log(placeData[9].properties)
                    const places = encodeURI(JSON.stringify(placeData))
                    res.render('dashboard/list', { 
                      showMap: true,
                      dashboard:true, 
                      query,
                      graphs, 
                      places, 
                      zipCodeCoords, 
                      placesObj,
                      token,
                      className,
                      tPOI:placeData.length,
                      ticketData,
                    })
                  })
              })
              .catch(err => console.error(`Error en el zipcode${err}`))
          })
          .catch(next)
      } else {
        res.redirect('/set')
      }
    })
    .catch(error => next(error));
}