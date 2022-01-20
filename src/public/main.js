//elements:
const snackbar = $("#snackbar");
const snackbarText = $("#snackbar > p");
const signinButton = $("#signin-submit-button");
const signupButton = $("#signup-submit-button");
const usernameTextField = $("#username");
const passwordTextField = $("#password");
//
signinButton.click(function (e) {
	e.preventDefault();
	let email = usernameTextField.val();
	let password = passwordTextField.val();

	const request = $.ajax({
		method: "POST",
		url: "http://localhost:8080/api/login",
		data: { email: email, password: password },
	});

	request.done(function (response) {
		let token = response.user.token;
		sessionStorage.setItem("token", JSON.stringify(token));
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
