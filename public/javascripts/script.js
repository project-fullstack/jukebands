<<<<<<< HEAD
require('dotenv').config();

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
=======
document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);
>>>>>>> 260d4c35ac0f63e85d461b8ce3bdf6d3333c53e5
