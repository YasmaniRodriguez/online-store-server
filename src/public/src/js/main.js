import { signinButton } from "./elements.js";
import { login } from "./requests.js";

$(document).ready(function () {
	signinButton.click((e) => login(e));
});
