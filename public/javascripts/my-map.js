class MyMap {
  constructor(container) {
    this.container = container;
    this.googleMap = null;
    this.markers = [];
  }

  init() {
    this.googleMap = new google.maps.Map(this.container, {
      zoom: 15,
      center: { lat: 41.3977381, lng: 2.190471916 }
    });
  }

  addMarker(lat, lng) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap
    });

    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }

  onClick(cb) {
    this.googleMap.addListener('click', cb);
  }
}