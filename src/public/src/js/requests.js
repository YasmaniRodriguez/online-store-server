import { showSnackBar } from "./functions.js";
import {
	usernameField,
	passwordLoginField,
	nameField,
	lastnameField,
	birthdayField,
	avatarField,
	phoneField,
	emailField,
	addressField,
	passwordRegistrationField,
	confirmPasswordField,
} from "./elements.js";

function login(e) {
	e.preventDefault();
	let email = usernameField.val();
	let password = passwordLoginField.val();

	let request = $.ajax({
		method: "POST",
		url: "http://localhost:8080/api/login",
		data: { email: email, password: password },
	});

	request.done(function (response) {
		let token = response.user.token;
		sessionStorage.setItem("token", token);
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
			authorization: "Bearer " + token,
		},
		url: "http://localhost:8080/api/logout",
	});

	request.done(function (response) {
		sessionStorage.removeItem("token");
		$(location).attr("href", "/signin");
		showSnackBar(response.message);
	});

	request.fail(function (jqXHR, textStatus) {
		console.log(jqXHR);
		console.log(textStatus);
	});
}

function registration(e) {
	e.preventDefault();

	let name = nameField.val();
	let lastname = lastnameField.val();
	let birthday = birthdayField.val();
	let avatar = avatarField.val();
	let phone = phoneField.val();
	let email = emailField.val();
	let address = addressField.val();
	let password = passwordRegistrationField.val();
	let confirmPassword = confirmPasswordField.val();

	let request = $.ajax({
		method: "POST",
		url: "http://localhost:8080/api/profiles",
		data: {
			name: name,
			lastname: lastname,
			birthday: birthday,
			avatar: avatar,
			phone: phone,
			email: email,
			address: address,
			password: password,
			confirm: confirmPassword,
			tyc: true,
		},
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

export { login, logout, registration };
