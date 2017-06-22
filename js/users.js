var usersReceived = {};
var asociatedUsers = {};

function showInfoInUsersTab() {
    $("#parkInfo").empty();
    if ($("#modalInfo #title").html !== parkings[parkingSelected].name) {
        showInfo(parkingSelected);
    }
    var info = $("#modalInfo").clone();
    $(info).removeClass("modal fade").css({
        "display": "block"
    });
    $(info).children().removeClass("modal-dialog");
    var content = $(info).children().children()["0"];
    $(content).css({
        "box-shadow": "unset"
    });
    $(content).children(".modal-footer").remove();
    $("#parkInfo").append(info);
}

function addUser(resp) {
    if (!usersReceived[resp.id.toString()]) {
        //Profile pictures are only 50x50 px, I want bigger images
        var url = resp.image.url.split("=")[0].concat("=80");
        var user = {"id":resp.id.toString(),"url": url,"name":resp.displayName};
        usersReceived[resp.id.toString()] = user;
        setUserPhoto(user);
    }
}

$("#parkUsers").droppable({
    accept: ".available",
    drop: function(event, ui) {
        var id = ui.draggable.attr("id");
        if (!asociatedUsers[parkings[parkingSelected].name]) {
            asociatedUsers[parkings[parkingSelected].name] = [];
        }
        if(!asociatedUsers[parkings[parkingSelected].name].includes(id)){
            asociatedUsers[parkings[parkingSelected].name].push(id);
        }
        showParkingUsers(parkings[parkingSelected], true);
    }
});

$("#users").droppable({
    accept: ".added",
    drop: function(event, ui) {
        var id = ui.draggable.attr("id");
        var index = asociatedUsers[parkings[parkingSelected].name].indexOf(id);
        ui.draggable.remove();
        asociatedUsers[parkings[parkingSelected].name].splice(index, 1);
        $(".user[id=" + id + "]").removeClass("invisible");
    }
});

function showParkingUsers(parking, update) {
    if (!update) {
        $("#parkUsers").empty();
        $("#users .user").removeClass("invisible");
    }
    $.each(asociatedUsers[parking.name], function(i, user) {
        if (!$("#parkUsers").has("#" + user).length) {
            var cloned = $("#users .available#" + user).clone();
            cloned.removeClass("available").addClass("added");
            $("#users .available#" + user).addClass("invisible");
            $("#parkUsers").append(cloned);
        }
    });
    setUsersDrag();
}

function setUsersDrag() {
    $('[data-toggle="tooltip"]').tooltip();
    $(".user").draggable({
        containment: $("#usersManagement"),
        helper: "clone",
        cursor: "grabbing",
        cursorAt: {
            left: 40,
            top: 40
        },
        zIndex: 100,
        revert: "invalid",
        revertDuration: 200,
    });
}

function restoreUsers(users){
    $.each(users,function(i,value){
        setUserPhoto(value);
    });
    if(parkingSelected!==-1){
        showParkingUsers(parkings[parkingSelected]);
    }
}

function setUserPhoto(user){
    $("<img>").attr({
        "src": user.url,
        "id": user.id,
        "class": "img-circle user available",
        "data-toggle": "tooltip",
        "data-placement": "top",
        "title": user.name
    }).appendTo($("#users"));
    setUsersDrag();
}

$("#addUser button").click(function(){
    var user = $("#addUser input").val();
    getGPlusUser(user);
});
