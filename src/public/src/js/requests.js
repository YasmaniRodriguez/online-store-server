import { showSnackBar } from "./functions.js";
import { usernameTextField, passwordTextField } from "./elements.js";

function login(e) {
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
		$(location).attr("href", "/home");
	});

	request.fail(function (jqXHR, textStatus) {
		showSnackBar(jqXHR.responseJSON.message);
	});
}

export { login };
