import { actions, signinButton, goBackButton } from "./elements.js";
import { showSnackBar, openOverlay, closeOverlay } from "./functions.js";
import { login } from "./requests.js";

$(document).ready(async function () {
	signinButton.click((e) => login(e));
	actions.click((e) => openOverlay(e));
	goBackButton.click((e) => closeOverlay(e));

	$("form#signup").submit(function (e) {
		e.preventDefault();

		let formData = new FormData(this);

		$.ajax({
			method: "POST",
			url: "/api/profiles",
			data: formData,
			success: function (response) {
				let token = response.user.token;
				sessionStorage.setItem("token", JSON.stringify(token));
				$(location).attr("href", "/home");
			},
			error: function (jqXHR, exception) {
				console.log(jqXHR);
				showSnackBar(jqXHR.responseJSON.message);
			},
			cache: false,
			contentType: false,
			processData: false,
		});
		return false;
	});
});
