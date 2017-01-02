var showNeighborhoods = true;
mapboxgl.accessToken = 'pk.eyJ1IjoiamRlYm9pIiwiYSI6ImNpeGRycXVreTAwZ20yemw2cmxta2N1anAifQ.O1DaomQGJpctzx05Vq422w';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/jdeboi/cixf2h3zs004p2qmu71zlh3bi', //hosted style id
    //style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-90.106873, 29.957861], // starting position
    zoom: 12 // starting zoom
});

map.on('load', function () {
  map.addSource('nola_neighborhoods', {
    'type': 'geojson',
    'data': 'json/neighborhoods.geojson'
  });
  //addNeighborhoods();
});

map.on('zoom', function(e) {
  if (map.getZoom() > 12 && !showNeighborhoods) {
    //addNeighborhoods();
    showNeighborhoods = true;
  }
  else if (map.getZoom() <= 12 && showNeighborhoods){
    //map.removeLayer('nola_neighborhoods_lines');
    //map.removeLayer('nola_neighborhoods_fill');
    showNeighborhoods = false;
  }
});

function searchAddress() {
   var addressInput = document.getElementById('address-input').value;
   var geocoder = new google.maps.Geocoder();
   geocoder.geocode({address: addressInput}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         var myResult = results[0].geometry.location;
         console.log(myResult.lat());
         map.flyTo({
             center: [myResult.lng(), myResult.lat()],
             zoom:17
         });
      } else { // se o valor de status é diferente de "google.maps.GeocoderStatus.OK"

          // mensagem de erro
          // alert("O Geocode não foi bem sucedido pela seguinte razão: " + status);
          console.log("erro");
      }
   });
}

function addNeighborhoods() {
  map.addLayer({
      'id': 'nola_neighborhoods_lines',
      'type': 'line',
      'source': 'nola_neighborhoods',
      'layout': {},
      'paint': {
          'line-color': '#100',
          'line-width': 3,
          'line-opacity':.2
      }
  });
  map.addLayer({
      'id': 'nola_neighborhoods_fill',
      'type': 'fill',
      'source': 'nola_neighborhoods',
      'layout': {},
      'paint': {
        'fill-opacity': 0,
        'fill-outline-color':'#A80'
      }
  });
}
