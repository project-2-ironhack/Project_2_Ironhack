const axios = require('axios')
const GOOGLE_API = process.env.PLACES_API_KEY
const mapping =  require('./../helpers/mapsParser').mapping; //custom parse for google map response
// npm variables
const importMongo = require('./importPlaces').importMongo
const postalCode = require('./postalCodes');
//! boolean not working
// ? searchig in all the postal codes. 
const allData = process.env.npm_config_allData || false

// ** Connect to database. 
  require('./../config/db.config') //r u sure?

if(!allData){
  console.log(`Okey, dude, we will search in ${postalCode.pc.length} postal codes from Madrid.`);
  postalCode.pc.forEach((where, index) => {
    setTimeout(function(){
      getPlaces(where)
        .then(status => console.log(`Imported: ${status} for ${where}`))
    }, index * 6000);    
  })
} else {
  // console.log(`we are looking for ${what} in ${where} and we will look for more ${all}`) 
  getPlaces()
    .then(status => console.log(`Imported: ${status}`))
    .catch(err => console.log(`err: ${err}`))
}


function getPlaces (where = 28045, what='Restaurants', output='json') {
  return (
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}?query=${what}+in+${where}+in+Madrid&fields=geometry&key=${GOOGLE_API}`)
      .then(sleeper())
      .then(response => {
        let data = mapping(response.data.results);
        console.log(`Status: ${response.data.status}`)
        console.log(`we found ${data.length} elements in the first page`)
        if(response.data.next_page_token) {
          return  (
            moreData(response.data.next_page_token)
              .then(sleeper())//sleeper para el tercer request
              .then(newData=>{
                data = [...data, ...mapping(newData.data)]
                console.log(`we found ${data.length} elements including the second page`)
                if(newData.nxtToken){
                  return  (
                    moreData(newData.nxtToken)
                      .then(newData=>{
                        data = [...data, ...mapping(newData.data)]                                    
                        console.log(`we found ${data.length} elements including the third page`)
                        return importMongo(data).then(status=>status)
                      })    
                  )
                } else {
                  return importMongo(data).then(status=>status)
                }
              })
          )
        } else {
          return importMongo(data).then(status=>status)
        }
      })
      .catch(error => console.log(error))
  )
}

const moreData = nxtToken => {
  return (
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {         
      params: {pagetoken : nxtToken, key : GOOGLE_API,}
    })
      .then(response => {
        // console.log(`Status: ${response.data.status}`)
        return {data: response.data.results, nxtToken: response.data.next_page_token}
      })
      .catch(err => console.log(err))
  )
}

/* 
* There is a short delay between when a next_page_token is issued, and when it will become valid. 
* Requesting the next page before it is available will return an INVALID_REQUEST response. 
* Retrying the request with the same next_page_token will return the next page of results.
 */
function sleeper(ms = 2000) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}