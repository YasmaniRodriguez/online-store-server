const snackbar = $("#snackbar");
const snackbarText = $("#snackbar > p");
const signinBtn = $("#signin-submit-button");
const signupBtn = $("#signup-submit-button");

signinBtn.click(function (e) {
	console.log(e);
});

function showSnackBar(message) {
	snackbarText[0].innerHTML = message;
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.className = snackbar.className.replace("show", "");
	}, 30000);
}
