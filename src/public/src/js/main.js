import {
	actions,
	signinButton,
	signupButton,
	goBackButton,
} from "./elements.js";
import { openOverlay, closeOverlay } from "./functions.js";
import { login, registration } from "./requests.js";

$(document).ready(async function () {
	signinButton.click((e) => login(e));
	signupButton.click((e) => registration(e));
	actions.click((e) => openOverlay(e));
	goBackButton.click((e) => closeOverlay(e));
});
