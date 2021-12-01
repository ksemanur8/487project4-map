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
                + '<p>' + elt.address + 
                '</p><a class="viewModal" onclick="generateModal(' + elt.id + ')">More Info</a></div>'
          });
          myMarker.addListener("click", () => {
            infoTip.open({ anchor: myMarker, map, shouldFocus: false });
          });
          
    })
}

function generateModal(id) {
    let placeName;
    let placeAddress;
    let placeDescription;
    let placePhoto;

    fetch("places.json")
  .then((response) => response.json())
  .then((json) => handleData(json))
    data.forEach((elt) => {
        if(elt.id == id) {
            elt.name = placeName;
            elt.address = placeAddress;
            elt.description = placeDescription;
            elt.photo = placePhoto;
        }
    })
    new jBox('Modal', {
        width: 300,
        height: 300,
        attach: '.viewModal',
        title: 'My Modal Window',
        content: '<div id="morefo">' +
        '<h3>' + placeName + '</h3>' 
        + '<img src="' + placePhoto + '"/>' + 
        '<p>' + placeAddress + '</p>' + 
        + '<p>' + placeDescription + '</p>' + 
        '</div>'
      })

 };

