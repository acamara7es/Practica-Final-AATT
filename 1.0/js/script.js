var parkings = [];
var parkingSelected = -1;

function loadParkings() {
    $.getJSON("aparcamientos.json").done(function(data, error) {
        if (error === "success") {
            $("#load_ad").remove();
            $("#tab-principal .tab-content").removeClass("invisible");
            $(".nav .disabled").removeClass("disabled");
            disableUsersTab();
        }
        parkings = processData(data);
        $.each(parkings, function(i, place) {
            var node = $("<li>", {
                "class": "list-group-item parking",
                "tag": i
            });
            node.html(place.name);
            $("#parking-list").append(node);
        });
        addParkingListEvents();
    });
}

function processData(data) {
    data.sort(orderByName);
    var processedParkings = [];
    $.each(data, function(i, obj) {
        var parking = new Parking(obj);
        parking.marker = createMarker(parking, i);
        parking.marker.on("click",function(e){
            $(".list-group-item[tag=" + i  + "]").click();
        });
        processedParkings.push(parking);
    });
    return processedParkings;
}

function showInfo(id) {
    var parking = parkings[id];
    $("#modalInfo #title").html(parking.name);
    $("#modalInfo #address").html(parking.address.street);
    $("#modalInfo #desc").html(parking.others);
    $("#modalInfo #area").html(parking.address.area);
    $("#modalInfo #area").append(" (" + parking.address.district + ")</br>");
    $("#modalInfo #area").append($("<span>", {
        "id": "postal-code",
        html: "Código postal: " + parking.address["postal-code"]
    }));
    setPhotos(parking.location);

}

//Callback para la petición JSONP de las fotos.
function processJSON(data) {
    $("#myCarousel .carousel-inner").empty();
    $("#slider-thumbs tr").empty();
    $(Object.entries(data.query.pages)).each(function(i, value) {
        var result = value[1].imageinfo[0];
        var photo = newPhotoNode(result.url, i);
        var thumb = newThumbnailNode(result.thumburl, i);
        $("#myCarousel .carousel-inner").append(photo);
        $("#slider-thumbs tr").append(thumb);

    });
    if (!$("#tab-principal").hasClass("invisible")) {
        $("body > #modalInfo").modal("show");
    }
    playCarousel();
}

function playCarousel() {
    $('#myCarousel').carousel();
    $('#myCarousel').on('slide.bs.carousel', function(event) {
        $('[id^=carousel-selector-]').removeClass("active");
        var id = $(event.relatedTarget).attr("data-slide-number");
        $("#carousel-selector-" + parseInt(id)).addClass("active");
    });
    $('[id^=carousel-selector-]').click(function() {
        var id = this.id.split("-");
        id = parseInt(id[id.length - 1]);
        $('#myCarousel').carousel(id);
    });
}
