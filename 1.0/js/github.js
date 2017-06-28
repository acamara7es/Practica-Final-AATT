function getGithubFormData(mode) {
	var modal = $("#githubModal form")[0];
	var token = $(modal.token).val();
	var user = $(modal.user).val();
	var repo = $(modal.repo).val();
	var file = $(modal.file).val() || $(modal.file).attr("placeholder");
	if (!(token && user && repo)) {
		$("#githubModal .alert-warning").removeClass("invisible");
	} else {
		if (mode === "save") {
			var commit = $(modal.commit).val() || $(modal.commit).attr("placeholder");
			exportData(token, user, repo, file, commit);
		} else {
			importData(token, user, repo, file);
		}
	}
}

function exportData(token, user, repo, file, commit) {
	var github = new GitHub({
		"token": token
	});
	var ghRepository = github.getRepo(user, repo);
	var data = {
		"collections": collections,
		"users": usersReceived,
		"parkingUsers": asociatedUsers
	};
	ghRepository.writeFile("master", file, JSON.stringify(data, null, 4), commit, {}, cb);
}

function importData(token, user, repo, file) {
	var github = new GitHub({
		"token": token
	});
	var ghRepository = github.getRepo(user, repo);
	ghRepository.getContents("master", file, true, read);
}


function cb(error, result) {
	if (!error) {
		alert("Guardado");
		hideModal();
	}
}

function read(error, result) {
	if (!error) {
		collections = result.collections;
		asociatedUsers = result.parkingUsers;
		showCollections();
		restoreUsers(result.users);
		hideModal();
	}
}

$("#save-data").click(function() {
	if (!$(this).hasClass("disabled")) break;
	$("#githubModal .alert").addClass("invisible");
	$("#githubModal h3").html("Guardar datos");
	$("#githubModal #commitInput").removeClass("invisible");
	$("#githubModal").modal("show");
	$("#githubModal button.btn-success").html("Guardar").click(function(e) {
		e.preventDefault();
		getGithubFormData("save");
	});

});

$("#load-data").click(function() {
	if (!$(this).hasClass("disabled")) break;
	$("#githubModal .alert").addClass("invisible");
	$("#githubModal h3").html("Cargar datos");
	$("#githubModal #commitInput").addClass("invisible");
	$("#githubModal").modal("show");
	$("#githubModal button.btn-success").html("Cargar").click(function(e) {
		e.preventDefault();
		getGithubFormData("load");
	});
});

function hideModal() {
	$("#githubModal").modal("hide");

}
