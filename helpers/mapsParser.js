module.exports.mapping = (data) => {
  data.map( e => {
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
        postalCode: () => e.name.match(/28(\d+){3}/)[0], 
        city: 'Madrid',
        country: 'Spain'
      }
    }
  })
}
