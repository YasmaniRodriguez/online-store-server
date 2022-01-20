import { actions, signinButton, goBackButton } from "./elements.js";
import { openOverlay, closeOverlay } from "./functions.js";
import { login } from "./requests.js";

$(document).ready(function () {
	signinButton.click((e) => login(e));
	actions.click((e) => openOverlay(e));
	goBackButton.click((e) => closeOverlay(e));
});
