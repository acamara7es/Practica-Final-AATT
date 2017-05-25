center = [40.41963869, -3.6738968];
var mymap = L.map('map').setView(center, 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
}).addTo(mymap);

function createMarker(parking,i) {
    var lat = parking.location.lat;
    var lng = parking.location.lng;
    var marker = L.marker([lat, lng]);
    var content = generatePopup(parking,i);
    marker.bindPopup(content.prop("outerHTML"));
    return marker;
}

function removeMarker(tag){
    var marker = parkings[tag].marker;
    mymap.removeLayer(marker);
}
