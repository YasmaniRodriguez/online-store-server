import { snackbar, overlay, goBackButton, popup } from "./elements.js";
import { buildHtmlAccountMenu } from "./builders.js";
import { logout } from "./requests.js";

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
			await popup.append(buildHtmlAccountMenu());
			$("#signout-submit-button").click((e) => logout(e));
			break;
		case "add-product-action":
			break;
		case "show-cart-action":
			break;
		case "show-messenger-action":
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
	popup.empty();
}

export { showSnackBar, openOverlay, closeOverlay };
