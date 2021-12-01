let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.91, lng: -79.0469 },
    zoom: 15
  });

  fetch("places.json")
  .then((response) => response.json())
  .then((json) => handleData(json))
}

function handleData(data) {
    data.forEach((elt) => {
        var myMarker = new google.maps.Marker({
            map: map,
            icon: "./images/marker-light.png",
            position: {
                lat: elt.latitude,
                lng: elt.longitude
            }
        })
        var infoTip = new google.maps.InfoWindow({
            content:
              '<div id="minifo">' +
                '<h3>' + elt.name + '</h3>' 
                + '<p>' + elt.address + '</p></div>' 
          });
          myMarker.addListener("click", () => {
            infoTip.open({ anchor: myMarker, map, shouldFocus: false });
          });
    })
}

