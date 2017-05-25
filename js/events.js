function addParkingListEvents(){
    $("#parking-list .list-group-item").click(function(event){
        if(parkingSelected != -1){
            mymap.removeLayer(parkings[parkingSelected].marker);
            $("#parking-list .list-group-item-info").removeClass("list-group-item-info");
        }
        parkingSelected = $(this).attr("tag");
        $(this).addClass("list-group-item-info");
        mymap.panTo(parkings[parkingSelected].location);
        parkings[parkingSelected].marker.addTo(mymap).openPopup();
        addPopupEvents();
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function addPopupEvents(){
    $(".leaflet-popup-content .btn-success").click(function(){
        var tag = $(this).attr("tag");
        showInfo(tag);
    });
    $(".leaflet-popup-content .btn-danger").click(function(){
        var tag = Number($(this).attr("tag"));
        var parking = $("#parking-list").children()[tag];
        removeMarker(tag);
        $(parking).removeClass("list-group-item-info");
    });
}
