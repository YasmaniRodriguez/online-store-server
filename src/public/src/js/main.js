import {
	actions,
	signinButton,
	signupButton,
	signoutButton,
	goBackButton,
} from "./elements.js";
import { openOverlay, closeOverlay } from "./functions.js";
import { login, logout, registration } from "./requests.js";

$(document).ready(function () {
	signinButton.click((e) => login(e));
	signoutButton.click((e) => logout(e));
	signupButton.click((e) => registration(e));
	actions.click((e) => openOverlay(e));
	goBackButton.click((e) => closeOverlay(e));
});
