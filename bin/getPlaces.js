const axios = require('axios')
const GOOGLE_API = process.env.PLACES_API_KEY
const mapping =  require('./../helpers/mapsParser').mapping; //custom parse for google map response

module.exports.getPlaces = (where, what, how) => {
  
  return (
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${what}+in+${where}+in+Madrid&fields=geometry&key=${GOOGLE_API}`)
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
                        return how(data).then(status=>status)
                      })    
                  )
                } else {
                  return how(data).then(status=>status)
                }
              })
          )
        } else {
          return how(data).then(status=>status)
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
const  sleeper = (ms = 2000) => {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}