const axios = require('axios')
const GOOGLE_API = 'AIzaSyC6ZCMc68-WlyzGtqkjraw3nroaEYqcIww' //! bring it from .env
const mapping =  require('./../helpers/mapsParser').mapping; //custom parse for google map response
// npm variables
const importMongo = require('./importPlaces').importMongo
const output = process.env.npm_config_output || 'json'
const what = process.env.npm_config_what || 'restaurants'
const where = process.env.npm_config_where || 28045
const postalCode = require('./postalCodes');
//! boolean not working
const all = process.env.npm_config_all || false // search in deeper pages
const restart = process.env.npm_config_all || true // delete previus data. 
// ? searchig in all the postal codes. 
const allData = process.env.npm_config_allData || false

if(allData){
  console.log(`Okey, dude, we will search in the ${postalCode.pc.length} postal codes from Madrid.`);
  
  // Promise.all([28045]).then(function(values) {
  //   console.log(values);
  // });

} else {
  console.log(`we are looking for ${what} in ${where} and we will look for more ${all}`) 
}

/* 
* There is a short delay between when a next_page_token is issued, and when it will become valid. 
* Requesting the next page before it is available will return an INVALID_REQUEST response. 
* Retrying the request with the same next_page_token will return the next page of results.
 */
const timeout = 1500

// * Get data from GoogleMaps. 
// ?  npm run seeds --what='Restaurants' --where=28045 
axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}?query=${what}+in+${where}&fields=geometry&key=${GOOGLE_API}`)
  .then(response => {
    // * First Response
    let page = response.data.results.length
    let data = mapping(response.data.results);
    if(response.data.next_page_token) {
      // * Second Response
      console.log(`looking in a second page for ${where}`)
      setTimeout(()=>{
        axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {         
          params: {
            pagetoken : response.data.next_page_token,
            key : GOOGLE_API,
          }   
        })
          .then(nextRes => {
            page += nextRes.data.results.length
            data = [...data, ...mapping(nextRes.data.results)]
            if(nextRes.data.next_page_token) {
              // * Third Response
              console.log(`looking in a third for ${where}`)
              setTimeout(()=>{
                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/${output}`, {         
                  params: {
                    pagetoken : nextRes.data.next_page_token,
                    key : GOOGLE_API,
                  }   
                })            
                  .then(finalRes => {
                    data = [...data, ...mapping(finalRes.data.results)]
                    page += finalRes.data.results.length            
                    console.log(`Status ${finalRes.data.status}, we found:  ${page} elements for the place ${where}`);
                    importMongo(data) 
                  })
                  .catch(err=>console.error(err))
              }, timeout)
            } else {
              console.log(`Status ${nextRes.data.status}, we found:  ${page} elements in a second level`);
              importMongo(data) 
            }
          })
          .catch(err=>console.error(err))
      }, timeout)
    } else {
      console.log(`Status ${response.data.status}, we found:  ${page} elements, in the first level`);
      importMongo(data) 

    }
  })
  .catch(error => console.log(error));