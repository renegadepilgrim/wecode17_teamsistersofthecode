//Declaring variables for usage//
var pos, sortedPotties, wifiImage;

//Intitial function placing origin marker on map//
function initMap() {
  map = new google.maps.Map(document.getElementById('map_holder'), {
        center: {lat: 45.523 , lng: -122.681 },
        zoom: 16
  });

//Allows for the map stylers to be made invisible for easier viewing//
  map.setOptions({
    styles:[
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
    ]
  })

//Generating window for map to display//
  infoWindow = new google.maps.InfoWindow;

//Function grabs the current location of the user and displays it on the map//
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Find a stop near you');
      infoWindow.open(map);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map:map
      });
      
      
    var request = {
      location: pos,
      radius: '500',
      type: ['cafe']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
      
      generateList();
    }, function() {
//Code breaking without function in place. Possible API code issue//
    });
  } else {
//Code breaking without function in place. Possible API code issue//
  }
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      wifiImage = {
        url: "images/wifi.png",
        scaledSize: new google.maps.Size(25,25),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
      };
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    icon: wifiImage,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}
