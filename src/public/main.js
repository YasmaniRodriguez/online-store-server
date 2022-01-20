//elements:
const snackbar = $("#snackbar");
const snackbarText = $("#snackbar > p");
const signinBtn = $("#signin-submit-button");
const signupBtn = $("#signup-submit-button");
const username = $("#username").val();
const password = $("#password").val();
//
signinBtn.click(function (e) {
	e.preventDefault();

	const request = $.ajax({
		method: "POST",
		url: "http://localhost:8080/api/login",
		data: { email: username, password: password },
	});

	request.done(function (msg) {
		console.log(msg);
	});

	request.fail(function (jqXHR, textStatus) {
		showSnackBar(jqXHR.responseJSON.message);
	});
});

//snackbar:
function showSnackBar(message) {
	snackbarText.empty();
	snackbarText.append(message);
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.removeClass("show");
	}, 3000);
}
