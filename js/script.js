var parkings = localStorage.getItem("parkings");
var parkingSelected = -1;

if (parkings) {
	parkings = processData(JSON.parse(parkings), true);
	prepareParkingList();
}

function loadParkings() {
	$.getJSON("aparcamientos.json").done(function(data, error) {
		if (error === "success") {
			parkings = processData(data);
			prepareParkingList();
			var parkJSON = "[";
			$.each(parkings, function(i, value) {
				var str = value.toString();
				if (i !== parkings.length - 1) {
					parkJSON = parkJSON.concat(str, ",");
				} else {
					parkJSON = parkJSON.concat(str, "]");
				}
			});
			localStorage.setItem("parkings", parkJSON);
		}
	});
}

function processData(data, localStoraged) {
	if (!localStoraged) {
		data.sort(orderByName);
	}
	var processedParkings = [];
	$.each(data, function(i, obj) {
		var parking = new Parking(obj, localStoraged);
		parking.marker = createMarker(parking, i);
		parking.marker.on("click", function(e) {
			$(".list-group-item[tag=" + i + "]").click();
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

function prepareParkingList() {
	$("#load_ad").remove();
	$("#tab-principal .tab-content").removeClass("invisible");
	$(".nav .disabled").removeClass("disabled");
	disableUsersTab();
	$.each(parkings, function(i, place) {
		var node = $("<li>", {
			"class": "list-group-item parking",
			"tag": i
		});
		node.html(place.name);
		$("#parking-list").append(node);
	});
	addParkingListEvents();
}

//Callback para la petición JSONP de las fotos.
function processJSON(data) {
	$("#myCarousel .carousel-inner").empty();
	$("#slider-thumbs tr").empty();
	$(Object.entries(data.query.pages)).each(function(i, value) {
		var result = value[1].imageinfo[0];
		var size = calculateImgSize(result.thumbwidth);
		var photoUrl = result.thumburl.replace(/(.jpg)\/([0-9]+)px/i, "$1\/" + size + "px");
		var photo = newPhotoNode(photoUrl, i);
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
