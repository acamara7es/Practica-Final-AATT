function addParkingListEvents() {
    $(".parking").click(function(event) {
        if (parkingSelected != -1) {
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
        $("#tab-colecciones").addClass("invisible");
        $("#tab-principal").removeClass("invisible");
        $("#tab-usuarios").addClass("invisible");
        $(".nav-title").removeClass("active");
        $(".parking").draggable("destroy");
        $(this).addClass("active");
        $("#tab-principal .panel-body").append($("#parking-list"));
    }
});

$("#nav-colecciones").click(function() {
    if (!$("#nav-colecciones").hasClass("active") && !$("#nav-colecciones").hasClass("disabled")) {
        $("#tab-principal").addClass("invisible");
        $("#tab-colecciones").removeClass("invisible");
        $("#tab-usuarios").addClass("invisible");
        $(".nav-title").removeClass("active");
        $(this).addClass("active");
        $("#col-disponibles").append($("#parking-list"));
        $(".parking").draggable({
            containment: $("#tab-colecciones"),
            helper: "clone",
            cursor: "grabbing",
            cursorAt: {
                left: 5,
                top: 21
            },
            zIndex: 100,
            revert: "invalid",
            revertDuration: 200,
        });
        setBadges();
    }
});
$("#nav-usuarios").click(function() {
    if (!$("#nav-usuarios").hasClass("active") && !$("#nav-usuarios").hasClass("disabled")) {
        $("#tab-principal").addClass("invisible");
        $("#tab-colecciones").addClass("invisible");
        $("#tab-usuarios").removeClass("invisible");
        $(".nav-title").removeClass("active");
        $(this).addClass("active");
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
    if(!collections[name]){
        collections[name]=[];
        collectionSelected = name;
    }else{
        alert("La colección " + name + " ya existe.");
    }
    showCollections();
    showCollectionParkings();
});
