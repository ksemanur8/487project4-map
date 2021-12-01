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
                '</p><a href="#myModal" rel="modal:open" class="modalClick" id="' + elt.id + '">More Info</a></div>'
          });
          myMarker.addListener("click", () => {
            infoTip.open({ anchor: myMarker, map, shouldFocus: false });
          });      
    })

    $(document).on("click", ".modalClick", function (event) {
      let placeId = event.target.id;
      let placeName;
      let placeAddress;
      let placeDescription;
      let placePhoto;
      data.forEach((elt) => {
        if(elt.id == placeId) {
          placeName = elt.name;
          placeAddress = elt.address;
          placeDescription = elt.description;
          placePhoto = elt.photo;
        }
      })
      document.getElementById("myModal").innerHTML = '<h3>' +
      placeName + '</h3><img width="75%" height="75%" src=' + placePhoto + '>' +
      '<h4>' + placeAddress + '</h4><p>' + placeDescription + '</p>' + 
      '<a href="#" rel="modal:close"></a>';
    })
};
