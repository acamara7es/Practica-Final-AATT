var parkings = [];
var parkingSelected = -1;

function loadParkings() {
    $("#load_ad").remove();
    $("#parking-list").removeClass("invisible");
    $.getJSON("/aparcamientos.json").done(function(data,error) {
        if(error==="success"){
            $(".nav .disabled").removeClass("disabled");
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
        console.log(parkings);
        addParkingListEvents();
    });
}

function processData(data) {
    data.sort(orderByName);
    var processedData = [];
    $.each(data, function(i, obj) {
        var parking = {
            "name": getName(obj),
            "address": {
                "district": getDistrict(obj),
                "area": getArea(obj),
                "postal-code": getPostalCode(obj),
                "street": getStreet(obj)
            },
            "location": getLocation(obj),
            "others": getOthers(obj)
        };
        parking.marker = createMarker(parking, i);
        processedData.push(parking);
    });
    return processedData;
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
    $("#modalInfo").modal("show");
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
