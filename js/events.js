function addParkingListEvents() {
    setParkingsDraggable();
    $(".parking").click(function(event) {
        if (parkingSelected != -1) {
            mymap.removeLayer(parkings[parkingSelected].marker);
            $("#parking-list .list-group-item-info").removeClass("list-group-item-info");
        } else {
            $("#nav-usuarios").removeClass("disabled")
                .attr({
                    "data-toggle": ""
                }).tooltip("destroy");
        }
        parkingSelected = $(this).attr("tag");
        $(this).addClass("list-group-item-info");
        mymap.panTo(parkings[parkingSelected].location);
        parkings[parkingSelected].marker.addTo(mymap).openPopup();
        addPopupEvents();
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function addPopupEvents() {
    $(".leaflet-popup-content .btn-success").click(function() {
        var tag = $(this).attr("tag");
        showInfo(tag);
    });
    $(".leaflet-popup-content .btn-danger").click(function() {
        var tag = Number($(this).attr("tag"));
        var parking = $("#parking-list").children()[tag];
        removeMarker(tag);
        $(parking).removeClass("list-group-item-info");
    });
}

$("#nav-principal").click(function() {
    if (!$("#nav-principal").hasClass("active")) {
        if(collectionSelected){
            $("#added-list").appendTo($("#collection-parking-list"));
            $(".added").draggable("disable");
            $("#added-list li").addClass("parking");
            addParkingListEvents();
        }
        changeTab("#tab-principal",this);
        $(".parking").draggable("disable");
        $("#parkInfo").empty();
        $("#tab-principal .tab-content").append($("#parking-list"));
    }
});

$("#nav-colecciones").click(function() {
    if (!$("#nav-colecciones").hasClass("active") && !$("#nav-colecciones").hasClass("disabled")) {
        if($("#tab-principal").has($("#added-list")).length){
            $("#tab-principal #added-list").appendTo($("#col-parkings-added"));
            $("#added-list li").removeClass("parking");
            $(".added").draggable("enable");
        }
        changeTab("#tab-colecciones", this);
        $(".parking").draggable("enable");
        $("#col-disponibles").append($("#parking-list"));
        setBadges();
    }
});
$("#nav-usuarios").click(function() {
    if (!$("#nav-usuarios").hasClass("active") && !$("#nav-usuarios").hasClass("disabled")) {
        changeTab("#tab-usuarios",this);
        showInfoInUsersTab();
        showParkingUsers(parkings[parkingSelected]);
    }
});

function addCollectionListEvents() {
    $("#collection-list .list-group-item").click(function(event) {
        $("#collection-list .list-group-item").removeClass("list-group-item-info");
        collectionSelected = $(this).html().split("<")[0];
        $(this).addClass("list-group-item-info");
        showCollectionParkings(collectionSelected);
    });
}

$("#newCollectionForm button").click(function() {
    var name = $("#newCollectionForm input").val();
    $("#newCollectionForm input").val("");
    if (!collections[name]) {
        collections[name] = [];
        collectionSelected = name;
    } else {
        alert("La colección " + name + " ya existe.");
    }
    showCollections();
    showCollectionParkings();
});
