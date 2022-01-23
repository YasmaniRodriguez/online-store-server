import { snackbar, overlay, goBackButton } from "./elements.js";
import {} from "./builders.js";

function showSnackBar(message) {
	snackbar.children("p").empty();
	snackbar.children("p").append(message);
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.removeClass("show");
	}, 3000);
}

async function openOverlay(e) {
	let callToAction = e.target.id;

	switch (callToAction) {
		case "show-account-action":
			$("#account-container").addClass("show");
			break;
		case "show-stock-action":
			$("#stock-container").addClass("show");
			break;
		case "show-cart-action":
			$("#cart-container").addClass("show");
			break;
		case "show-messenger-action":
			$("#messenger-container").addClass("show");
			break;
		default:
			break;
	}

	overlay.fadeIn().css("display", "flex");
	goBackButton.show();
}

function closeOverlay(e) {
	overlay.fadeOut();
	goBackButton.hide();
	$("#account-container").removeClass("show");
	$("#stock-container").removeClass("show");
	$("#cart-container").removeClass("show");
	$("#messenger-container").removeClass("show");
}

export { showSnackBar, openOverlay, closeOverlay };
