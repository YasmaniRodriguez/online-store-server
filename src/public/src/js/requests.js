import { showSnackBar } from "./functions.js";
import { usernameField, passwordLoginField } from "./elements.js";

function login(e) {
	e.preventDefault();
	let username = usernameField.val();
	let password = passwordLoginField.val();

	let request = $.ajax({
		method: "POST",
		url: "/api/login",
		data: { username: username, password: password },
	});

	request.done(function (response) {
		showSnackBar("session logged on successfully");
		setTimeout(function () {
			let token = response.user.token;
			sessionStorage.setItem("token", token);
			$(location).attr("href", "/home");
		}, 3000);
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
		url: "/api/logout",
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
