var center = [40.41963869, -3.6738968];
var mymap = L.map('map').setView(center, 12);
var markers = [];
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

function showMarker(li, tag){
    mymap.panTo(parkings[tag].location);
    if(markers.includes(tag)){
        parkings[tag].marker.openPopup();
    }else{
        parkings[tag].marker.addTo(mymap).openPopup();
        $(li).append($("<span class='glyphicon glyphicon-map-marker'>"));
        markers.push(Number.parseInt(tag));
    }
    addPopupEvents();
    $('[data-toggle="tooltip"]').tooltip(); //Para los tooltips de los botones del popUp
}

function removeMarker(tag){
    var marker = parkings[tag].marker;
    var index = markers.indexOf(tag);
    markers.splice(index,1);
    mymap.removeLayer(marker);
    $(".list-group-item[tag=" + tag + "] span").remove();
}

function addPopupEvents() {
    $(".leaflet-popup-content .btn-success").click(function() {
        var tag = $(this).attr("tag");
        showInfo(tag);
    });
    $(".leaflet-popup-content .btn-danger").click(function() {
        var tag = Number($(this).attr("tag"));
        var parking = $("#parking-list").children()[tag];
        if(collectionSelected && collections[collectionSelected].includes(tag)){
            parking = $("#added-list li[tag=" + tag + "]");
        }
        removeMarker(tag);
        $(parking).removeClass("list-group-item-info");
    });
}
