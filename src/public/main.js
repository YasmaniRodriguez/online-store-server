const snackbar = $("#snackbar");
const snackbarText = $("#snackbar > p");
const signinBtn = $("#signin-submit-button");
const signupBtn = $("#signup-submit-button");

signinBtn.click(function (e) {
	e.preventDefault();
	showSnackBar("esto se va a descrontrolaaaaaaaaar");
});

function showSnackBar(message) {
	snackbarText.empty();
	snackbarText.append(message);
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.removeClass("show");
	}, 3000);
}
