var apiKey = "AIzaSyCmLE0CXrcYwlIEfF1nT2PwWWW76c-85_w"; //Only works on acamara7es.github.io domain
var socket = null;


function startGooglePlusApi() {
	gapi.client.setApiKey(apiKey);
	console.log("Google+ API cargada");
}


function startWebSocket() {
	try {
		$("#tab-usuarios .alert-warning").removeClass("invisible");
		var host = "wss://shielded-cove-96281.herokuapp.com/users";
		socket = new ReconnectingWebSocket(host);
		socket.onopen = function(e) {
			serverUp();
		};
		socket.onclose = function(e) {
			serverDown();
		};
		socket.onmessage = function(e) {
			getGPlusUser(e.data);
		};
	} catch (ex) {
		serverDown();
	}
}

function getGPlusUser(userId) {
	gapi.client.load('plus', 'v1', function() {
		var user_request = gapi.client.plus.people.get({
			'userId': userId,
			'fields': "displayName,id,image/url,url"
		});
		user_request.execute(function(resp) {
			if (!resp.error) {
				console.log(resp);
				addUser(resp);
			} else {
				console.log(resp.error);
				// alert("Error al realizar la petición");
			}
		});
	});
}

$("#startServer").click(function(event) {
	startWebSocket();
	$(event.target).addClass("invisible");
});

function serverUp() {
	$("#tab-usuarios .alert-danger").addClass("invisible");
	$("#tab-usuarios .alert-warning").addClass("invisible");
	$("#tab-usuarios .alert-success").removeClass("invisible");
}

function serverDown() {
	$("#tab-usuarios .alert-warning").addClass("invisible");
	$("#tab-usuarios .alert-success").addClass("invisible");
	$("#tab-usuarios .alert-danger").removeClass("invisible");
	$("#startServer").removeClass("invisible");
}
