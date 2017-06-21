var Parking = function(data) {
    this.name = getName(data);
    this.address = {
        "district": shortUrl(data.address.district),
        "area": shortUrl(data.address.area),
        "postal-code": Number(data.address["postal-code"]),
        "street": data.address["street-address"],
    };
    this.location = getLocation(data);
    this.others = data.organization["organization-desc"];
};

function getName(obj) {
    var title = obj.title.split(".");
    return title[title.length - 1].trim();
}

function shortUrl(fullUrl) {
    var url = fullUrl["@id"].split("/");
    return url[url.length - 1];
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
