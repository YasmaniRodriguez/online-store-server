import { showSnackBar } from "./functions.js";
import { usernameTextField, passwordTextField } from "./elements.js";

function login(e) {
	e.preventDefault();
	let email = usernameTextField.val();
	let password = passwordTextField.val();

	let request = $.ajax({
		method: "POST",
		url: "http://localhost:8080/api/login",
		data: { email: email, password: password },
	});

	request.done(function (response) {
		let token = response.user.token;
		sessionStorage.setItem("token", JSON.stringify(token));
		$(location).attr("href", "/home");
	});

	request.fail(function (jqXHR, textStatus) {
		showSnackBar(jqXHR.responseJSON.message);
	});
}

function logout(e) {
	e.preventDefault();
	let token = sessionStorage.getItem("token");

	let request = $.ajax({
		method: "GET",
		headers: {
			authorization: token,
		},
		url: "http://localhost:8080/api/logout",
	});

	request.done(function (response) {
		console.log(response);
	});

	request.fail(function (jqXHR, textStatus) {
		console.log(jqXHR);
		console.log(textStatus);
	});
}

export { login, logout };
