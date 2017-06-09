var apiKey = "AIzaSyCmLE0CXrcYwlIEfF1nT2PwWWW76c-85_w";
var socket = null;


function startGooglePlusApi(userId) {
    gapi.client.setApiKey(apiKey);
}


function startWebSocket() {
    try {
        startGooglePlusApi();
        var host = "ws://localhost:10000/";
        socket = new WebSocket(host);
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
            'fields': "displayName,id,image/url"
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

$("#startServer").click(function(event){
    startWebSocket();
    $(event.target).addClass("invisible");
});

function serverUp() {
    $("#tab-usuarios .alert-danger").addClass("invisible");
    $("#tab-usuarios .alert-success").removeClass("invisible");
}

function serverDown() {
    $("#tab-usuarios .alert-success").addClass("invisible");
    $("#tab-usuarios .alert-danger").removeClass("invisible");
}
