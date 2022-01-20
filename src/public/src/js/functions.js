import { snackbar, overlay, goBackButton } from "./elements.js";

function showSnackBar(message) {
	snackbar.children("p").empty();
	snackbar.children("p").append(message);
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.removeClass("show");
	}, 3000);
}

function openOverlay(e) {
	let callToAction = e.target.classList;

	console.log(callToAction);

	overlay.fadeIn().css("display", "flex");
	goBackButton.show();
}

function closeOverlay(e) {
	overlay.fadeOut();
	goBackButton.hide();
}

export { showSnackBar, openOverlay, closeOverlay };
