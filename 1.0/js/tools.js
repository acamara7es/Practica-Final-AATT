function disableUsersTab() {
	$("#nav-usuarios").addClass("disabled").attr({
		"data-toggle": "tooltip",
		"data-placement": "bottom",
		"title": "Selecciona un aparcamiento"
	}).tooltip();
}

function orderByName(a, b) {
	return getName(a).localeCompare(getName(b));
}

function generatePopup(parking, i) {
	var content = $("<span>");
	content.append($("<h4>", {
		html: parking.name
	}));
	$("<p>").html(parking.address.street).appendTo(content);
	$("<button>", {
		"type": "button",
		"data-toggle": "tooltip",
		"data-placement": "bottom",
		"title": "Ver info",
		"class": "btn btn-success",
		"tag": i,
		html: '<span class="glyphicon glyphicon-info-sign"></span>'
	}).appendTo(content);
	$("<button>", {
		"type": "button",
		"data-toggle": "tooltip",
		"data-placement": "bottom",
		"title": "Quitar",
		"class": "btn btn-danger",
		"tag": i,
		html: '<span class="glyphicon glyphicon-remove-sign"></span>'
	}).appendTo(content);
	return content;
}

function setPhotos(location) {
	$.ajax({
		"url": "https://commons.wikimedia.org/w/api.php",
		"dataType": "jsonp",
		"data": {
			"action": "query",
			"format": "json",
			"generator": "geosearch",
			"ggsprimary": "all",
			"ggsnamespace": 6,
			"ggsradius": 1000,
			"ggscoord": location.lat + "|" + location.lng,
			"ggslimit": "10",
			"prop": "imageinfo",
			"iilimit": 1,
			"iiprop": "url",
			"iiurlwidth": 200,
			"iiurlheight": 200,
			"callback": "processJSON",
		}
	});
}

function newPhotoNode(url, i) {
	var picture = $("<div>", {
		"class": "item",
		"data-slide-number": i,
		html: $("<img src=" + url + ">")
	});
	if (i === 0) {
		picture.addClass("active");
	}
	return picture;
}

function newThumbnailNode(url, i) {
	var thumb = $("<img>", {
		"class": "img-thumbnail",
		"id": "carousel-selector-" + i,
		"src": url
	});
	if (i === 0) {
		thumb.addClass("active");
	}
	return $("<td>").append(thumb);
}

function changeTab(newTab, nav) {
	$("#tab-principal").addClass("invisible");
	$("#tab-colecciones").addClass("invisible");
	$("#tab-usuarios").addClass("invisible");
	$(newTab).removeClass("invisible");
	$(".nav-title").removeClass("active");
	$(nav).addClass("active");
}

function setParkingsDraggable() {
	$(".parking").draggable({
		containment: $("#tab-colecciones"),
		disabled: true,
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
}
