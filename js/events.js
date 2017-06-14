function addParkingListEvents() {
    setParkingsDraggable();
    $(".parking").click(function(event) {
        if (parkingSelected == -1) {
            $("#nav-usuarios").removeClass("disabled")
                .attr({
                    "data-toggle": ""
                }).tooltip("destroy");
        }
        parkingSelected = Number.parseInt($(this).attr("tag"));
        showMarker(event.target, parkingSelected);
    });
}

$("#nav-principal").click(function(e) {
    e.preventDefault();
    if (!$("#nav-principal").hasClass("active")) {
        if(collectionSelected){
            $("#collection_ad").remove();
            $("#added-list").appendTo($("#collection-parking-list"));
            $(".added").draggable("disable");
            $("#added-list li").addClass("parking");
            addParkingListEvents();
        }
        changeTab("#tab-principal",this);
        $(".parking").draggable("disable");
        $("#parkInfo").empty();
        $("#tab-principal .tab-content").append($("#parking-list"));
        if(parkingSelected!=-1){
            $(".list-group-item[tag=" + parkingSelected + "]").click();
        }
    }
});

$("#nav-colecciones").click(function(e) {
    e.preventDefault();
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
$("#nav-usuarios").click(function(e) {
    e.preventDefault();
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
