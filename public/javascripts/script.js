var promise = new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(function(position) {
    resolve(
      (pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    );
  });
});
promise.then(currentCoords => {
  const URL = `http://localhost:3000/auth/profile-band`;
  let currentMarker;

  mapboxgl.accessToken =
    "pk.eyJ1IjoidmljYmFuIiwiYSI6ImNqczFobXl5cTFsbXI0M29jdXp6OXVqcGQifQ.YPIeCxviK0RvnP3aUa3qgg";

  axios.get('http://localhost:3000/auth/profile-band/getCurrentMarket').then((currentmarket) => {
  const placeUser = currentmarket.data.place;
    if (placeUser != undefined){
      var el = document.createElement('div');
      el.className = 'marker';
      currentMarker = placeUser;
    currentMarker = new mapboxgl.Marker()
      .setLngLat(placeUser)
      .addTo(map);
    }
  });

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [currentCoords.lng, currentCoords.lat],
    zoom: 12
  });


  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(geocoder);

  map.on('load', function () {
    map.addSource('single-point', {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });

    map.addLayer({
      "id": "point",
      "source": "single-point",
      "type": "circle",
      "paint": {
        "circle-radius": 10,
        "circle-color": "#007cbf"
      }
    });

    geocoder.on('result', function (ev) {
      map.getSource('single-point').setData(ev.result.geometry);
    });
  });

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));

  let clickedPos = new mapboxgl.Marker();
  map.on("click", function(e) {
    clickedPos.setLngLat(e.lngLat).addTo(map);

    if (currentMarker) {
      currentMarker.remove();
    }

    axios.post(URL, e.lngLat).then(function() {
    });
  });
});
