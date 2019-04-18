function initMap() {
  const mapContainer = document.getElementById("map")
  if (!mapContainer) return;
  
  const form = document.getElementById("places-form")

  const myMap = new MyMap(mapContainer)  
  myMap.init()

  if (form) {
    setFormMapListeners(myMap)
    const id = form.getAttribute('data-id')  
    if(id){
      editPlaceMap(myMap, id)
    }
  } else if (document.getElementById("place-list")) {
    addPlacesToMap(myMap)
  }
}
function editPlaceMap(myMap, id) {
  axios.get(`/places/${id}/coordinates`)
    .then(response => {
      myMap.addMarker(
        response.data[1],
        response.data[0]
      )
    })
    .catch(console.log)
}
function addPlacesToMap(myMap) {
  console.log('inside dom js')
  axios.get('/places/coordinates')
    .then(response => {
      console.log(response)
      response.data.forEach(coordinate => {
        myMap.addMarker(
          coordinate.coordinates[1],
          coordinate.coordinates[0]
        )
      })
    })
    .catch(console.log)
}

function setFormMapListeners(myMap) {
  myMap.onClick((event) => {
    const { lat, lng } = event.latLng.toJSON()

    myMap.clearMarkers()
    myMap.addMarker(lat, lng)

    document.getElementById("lat").value = lat.toFixed(3)
    document.getElementById("lng").value = lng.toFixed(3)
  })
}