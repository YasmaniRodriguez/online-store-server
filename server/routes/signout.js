const express = require("express");
const router = express.Router();
const moment = require("moment");
const service = require("../services/messaging.js").Email;
const conf = require("../config.js");

router.get("/signout", (req, res) => {
	req.logOut(); //req.session.destroy();
	res.status(200).json({ message: "logout success!" });
	const email = new service();
	//ethereal notification:
	email.SendMessage(
		"ethereal",
		conf.ETHEREAL_OPTIONS.auth.user,
		conf.ETHEREAL_OPTIONS.auth.user,
		"logout",
		`logout ${req.sessionID} ${moment().format()}`
	);
});

module.exports = router;
