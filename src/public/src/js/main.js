import {
	actions,
	signinButton,
	signoutButton,
	goBackButton,
} from "./elements.js";
import { showSnackBar, openOverlay, closeOverlay } from "./functions.js";
import { login, logout } from "./requests.js";

$(document).ready(async function () {
	signinButton.click((e) => login(e));
	signoutButton.click((e) => logout(e));
	actions.click((e) => openOverlay(e));
	goBackButton.click((e) => closeOverlay(e));

	$("form#signup").submit(function (e) {
		e.preventDefault();

		let formData = new FormData(this);

		$.ajax({
			method: "POST",
			url: "/api/profiles",
			data: formData,
			success: async function (response) {
				showSnackBar("successfully created account, now you can login");
				setTimeout(function () {
					$(location).attr("href", "/signin");
				}, 3000);
			},
			error: async function (jqXHR, exception) {
				message = await jqXHR.responseJSON.message;
				showSnackBar(message);
			},
			cache: false,
			contentType: false,
			processData: false,
		});
		return false;
	});
});
