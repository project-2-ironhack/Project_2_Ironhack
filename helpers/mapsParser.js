module.exports.mapping = (data) => {
  pc = (string) => string.match(/28(\d+){3}/)[0] 
  return data.map( e => {
    return {
      name : e.name,
      type: "Feature",      
      geometry: {
        type: 'Point',
        coordinates: [
          //* les damos la vuelta...  
          e.geometry.location.lng,
          e.geometry.location.lat,
        ]
      }, 
      properties : {
        address: e.formatted_address,
        googleId: e.id,
        priceLevel : e.price_level,
        types : e.types,
        //* Extraemos el código postal
        postalCode: pc(e.formatted_address),
        city: 'Madrid',
        country: 'Spain'
      }
    }
  })
}