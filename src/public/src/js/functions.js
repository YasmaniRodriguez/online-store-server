import {
	snackbar,
	overlay,
	goBackButton,
	usernameField,
	passwordField,
	messageField,
} from "./elements.js";
import { buildHtmlMessages } from "./builders.js";
const socket = io();

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

async function closeOverlay(e) {
	overlay.fadeOut();
	goBackButton.hide();
	$("#account-container").removeClass("show");
	$("#stock-container").removeClass("show");
	$("#cart-container").removeClass("show");
	$("#messenger-container").removeClass("show");
}

async function login(e) {
	e.preventDefault();
	let username = usernameField.val();
	let password = passwordField.val();

	let request = $.ajax({
		method: "POST",
		url: "/api/login",
		data: { username: username, password: password },
	});

	request.done(function (response) {
		showSnackBar("session logged on successfully");
		setTimeout(function () {
			let token = response.user.token;
			sessionStorage.setItem("token", token);
			$(location).attr("href", "/home");
		}, 3000);
	});

	request.fail(function (jqXHR, exception) {
		showSnackBar(jqXHR.responseJSON.message);
	});
}

async function logout(e) {
	e.preventDefault();
	let token = sessionStorage.getItem("token");

	let request = $.ajax({
		method: "GET",
		headers: {
			authorization: "Bearer " + token,
		},
		url: "/api/logout",
	});

	request.done(function (response) {
		sessionStorage.removeItem("token");
		showSnackBar(response.message);
		setTimeout(function () {
			$(location).attr("href", "/signin");
		}, 4000);
	});

	request.fail(function (jqXHR, exception) {
		showSnackBar(jqXHR.responseJSON.error);
	});
}

async function renderMessage(data) {
	await $("#messages").empty();
	let html = await data.map((message) => buildHtmlMessages(message)).join(" ");
	$("#messages").append(html);
}

async function sendMessage(e) {
	e.preventDefault();

	let message = {
		author: await User,
		message: await messageField.val(),
	};

	await socket.emit("addMessage", message);

	$("#message").val("");
}

export {
	showSnackBar,
	openOverlay,
	closeOverlay,
	login,
	logout,
	renderMessage,
	sendMessage,
};
