function getName(obj) {
    var title = obj.title.split(".");
    return title[title.length - 1].trim();
}

function getDistrict(obj) {
    var url = obj.address.district["@id"].split("/");
    return url[url.length - 1];
}

function getArea(obj) {
    var url = obj.address.area["@id"].split("/");
    return url[url.length - 1];
}

function getPostalCode(obj) {
    return Number(obj.address["postal-code"]);
}

function getStreet(obj) {
    return obj.address["street-address"];
}

function getLocation(obj) {
    var latitude = Number(obj.location.latitude);
    var longitude = Number(obj.location.longitude);
    var l = {
        "lat": latitude,
        "lng": longitude
    };
    return l;
}

function getOthers(obj) {
    return obj.organization["organization-desc"];
}

function orderByName(a, b) {
    return getName(a).localeCompare(getName(b));
}

function generatePopup(parking,i) {
    var content = $("<span>");
    content.append($("<h4>", {
        html: parking.name
    }));
    $("<p>").html(parking.address.street).appendTo(content);
    $("<button>", {
        "type":"button",
        "data-toggle":"tooltip",
        "data-placement": "bottom",
        "title":"Ver info",
        "class": "btn btn-success",
        "tag": i,
        html: '<span class="glyphicon glyphicon-info-sign"></span>'
    }).appendTo(content);
    $("<button>", {
        "type":"button",
        "data-toggle":"tooltip",
        "data-placement": "bottom",
        "title":"Quitar",
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
            "format": "json",
            "action": "query",
            "generator": "geosearch",
            "ggsprimary": "all",
            "ggsnamespace": 6,
            "ggsradius": 1000,
            "ggscoord": location.lat + "|" + location.lng,
            "ggslimit": "10",
            "prop":"imageinfo",
            "iilimit": 1,
            "iiprop": "url",
            "iiurlwidth": 200,
            "iiurlheight": 200,
            "callback": "processJSON",
        }
    });
}

function newPhotoNode(url,i){
    var picture = $("<div>", {
        "class": "item",
        "data-slide-number": i,
        html: $("<img src=" + url + ">")
    });
    if(i===0){
        picture.addClass("active");
    }
    return picture;
}

function newThumbnailNode(url,i){
    var thumb = $("<img>", {
        "class": "img-thumbnail",
        "id": "carousel-selector-" + i,
        "src": url
    });
    if(i===0){
        thumb.addClass("active");
    }
    return $("<td>").append(thumb);
}
