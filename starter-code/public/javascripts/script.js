

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
  mapboxgl.accessToken =
    "pk.eyJ1IjoidmljYmFuIiwiYSI6ImNqczFobXl5cTFsbXI0M29jdXp6OXVqcGQifQ.YPIeCxviK0RvnP3aUa3qgg";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [currentCoords.lng, currentCoords.lat],
    zoom: 12
  });
  let clickedPos = new mapboxgl.Marker();
  map.on("click", function(e) {
    console.log(e.lngLat);
    clickedPos.setLngLat(e.lngLat).addTo(map);

    const URL = `http://localhost:3000/auth/profile-band`;

    axios.post(URL, e.lngLat).then(function() {
      console.log("banda guardadada");
      // console.log(lngLat)
     
    });
  });
});
