import { showSnackBar } from "./functions.js";
import { usernameField, passwordLoginField } from "./elements.js";

function login(e) {
	e.preventDefault();
	let email = usernameField.val();
	let password = passwordLoginField.val();

	let request = $.ajax({
		method: "POST",
		url: "/api/login",
		data: { email: email, password: password },
	});

	request.done(function (response) {
		let token = response.user.token;
		sessionStorage.setItem("token", token);
		$(location).attr("href", "/home");
	});

	request.fail(function (jqXHR, exception) {
		showSnackBar(jqXHR.responseJSON.message);
	});
}

function logout(e) {
	e.preventDefault();
	let token = sessionStorage.getItem("token");

	let request = $.ajax({
		method: "GET",
		headers: {
			authorization: "Bearer " + token,
		},
		url: "http://localhost:8080/api/logout",
	});

	request.done(function (response) {
		sessionStorage.removeItem("token");
		showSnackBar(response.message);
		setTimeout(function () {
			$(location).attr("href", "/signin");
		}, 4000);
	});

	request.fail(function (jqXHR, exception) {
		showSnackBar(jqXHR.responseJSON.error);
	});
}

export { login, logout };
