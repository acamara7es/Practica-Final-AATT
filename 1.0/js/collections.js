var collections = {};
var collectionSelected = null;

$.getJSON("default-collections.json").done(function(data, error) {
    if (error === "success") {
        collections = data;
        showCollections();
    }
});

$("#col-parkings-added").droppable({
    accept: ".parking",
    drop: function(event, ui) {
        if (collectionSelected) {
            var tag = Number.parseInt($(ui.draggable).attr("tag"));
            ui.draggable.addClass("invisible");
            collections[collectionSelected].push(tag);
            collections[collectionSelected].sort(function(a, b) {
                return a - b;
            });
            showCollections();
            showCollectionParkings(collectionSelected);
        }
    }
});

$("#col-disponibles").droppable({
    accept: ".added",
    drop: function(event, ui) {
        var tag = Number.parseInt(ui.draggable.attr("tag"));
        var index = collections[collectionSelected].indexOf(tag);
        ui.draggable.remove();
        collections[collectionSelected].splice(index, 1);
        $(".parking[tag="+ tag + "]").removeClass("invisible");
        showCollections();
    }
});

function setBadges() {
    $("#available-parks-badge").html(parkings.length);
    $("#collections-badge").html(collections.length);
    if (collectionSelected) {
        console.log(collectionSelected);
        var collectionParkings = collections[collectionSelected];
        $("#parks-added-badge").html(collectionParkings.length);
        $("#available-parks-badge").html(parkings.length - collectionParkings.length);
    }
}

function showCollections() {
    $("#collection-list").empty();
    var collectionNames = Object.keys(collections);
    collectionNames.sort(function(a,b){
        var A = a.toLocaleUpperCase();
        var B = b.toLocaleUpperCase();
        return  A.localeCompare(B);
    });
    $.each(collectionNames, function(i, collection) {
        var node = $("<li>", {
            "class": "list-group-item",
        });
        node.html(collection);
        node.append($("<span class=badge>").html(collections[collection].length));
        $("#collection-list").append(node);
    });
    addCollectionListEvents();
    setBadges();
}

function showCollectionParkings(collection) {
    $("#added-list").empty().removeClass("invisible");
    $(".parking").removeClass("invisible");
    $.each(collections[collection], function(i, park) {
        $(".parking[tag=" + park + "]").addClass("invisible");
        var node = $("<li>", {
            "class": "list-group-item added",
            "tag": park,
            html: parkings[park].name
        });
        if(markers.includes(park)){
            node.append($("<span class='glyphicon glyphicon-map-marker'>"));
        }
        $("#added-list").append(node);
    });
    $(".added").draggable({
        containment: $("#tab-colecciones"),
        helper: "clone",
        cursor: "grabbing",
        cursorAt:{
            left: 5,
            top: 21
        },
        zIndex: 100,
        revert: "invalid",
        revertDuration: 200,
    });
    setBadges();
}
