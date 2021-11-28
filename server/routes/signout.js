const express = require("express");
const router = express.Router();
const moment = require("moment");
const emailThirdPartyService = require("../thirdPartyServices/email.js");
const conf = require("../config.js");

router.get("/signout", (req, res) => {
	req.logOut();
	//req.session.destroy();
	res.status(200).json({ message: "logout success!" });
	console.log(res);
	const email = new emailThirdPartyService();
	console.log(req);
	//ethereal notification:
	email.SendMessage(
		"ethereal",
		conf.MAIL_SERVICE_ETHEREAL_OPTIONS.auth.user,
		conf.MAIL_SERVICE_ETHEREAL_OPTIONS.auth.user,
		"logout",
		`logout ${req.sessionID} ${moment().format()}`
	);
});

module.exports = router;
