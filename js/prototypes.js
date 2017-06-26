var Parking = function(data, formatted) {
	if (formatted) {
		this.name = data.name;
		this.address = data.address;
		this.location = data.location;
		this.others = data.others;
	} else {
		this.name = getName(data);
		this.address = {
			"district": shortUrl(data.address.district),
			"area": shortUrl(data.address.area),
			"postal-code": Number(data.address["postal-code"]),
			"street": data.address["street-address"],
		};
		this.location = getLocation(data);
		this.others = data.organization["organization-desc"];
	}
	this.toString = function() {
		return JSON.stringify({
			"name": this.name,
			"address": this.address,
			"location": this.location,
			"others": this.others,
		});
	};
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
