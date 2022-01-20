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
	overlay.fadeIn().css("display", "flex");
	goBackButton.show().css("display", "flex");
}

function closeOverlay(e) {
	overlay.fadeOut();
	goBackButton.hide();
}

export { showSnackBar, openOverlay, closeOverlay };
