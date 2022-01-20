import { snackbar, overlay, goBackButton, popup } from "./elements.js";

const accountMenuHtml = `
<div id="account-pop-up-menu">
	<h3>WHAT DO YOU WANT TO DO</h3>
	<div id="option-logout">
		<p>Logout</p>
	</div>
</div>
`;

function showSnackBar(message) {
	snackbar.children("p").empty();
	snackbar.children("p").append(message);
	snackbar.addClass("show");
	setTimeout(function () {
		snackbar.removeClass("show");
	}, 3000);
}

function openOverlay(e) {
	let callToAction = e.target.id;

	switch (callToAction) {
		case "show-account-action":
			popup.append(accountMenuHtml);
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
}

export { showSnackBar, openOverlay, closeOverlay };
