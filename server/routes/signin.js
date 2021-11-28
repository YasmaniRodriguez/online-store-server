const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const emailThirdPartyService = require("../thirdPartyServices/email.js");
const conf = require("../config.js");

router.post("/signin/:id", (req, res, next) => {
	const strategy = req.params.id;
	switch (strategy) {
		case "local":
			passport.authenticate("local", (err, user, info) => {
				if (err) throw err;
				if (!user) {
					res.status(401).json({ error: "wrong user or password" });
				} else {
					req.logIn(user, (err) => {
						if (err) {
							throw err;
						} else {
							const email = new emailThirdPartyService();
							res
								.status(200)
								.json({ message: "successfully authenticated user" });
							//ethereal notification:
							email.SendMessage(
								"ethereal",
								conf.MAIL_SERVICE_ETHEREAL_OPTIONS.auth.user,
								conf.MAIL_SERVICE_ETHEREAL_OPTIONS.auth.user,
								"login",
								`login ${req.sessionID} ${moment().format()}`
							);
							//gmail notification:
							email.SendMessage(
								"gmail",
								conf.MAIL_SERVICE_GMAIL_OPTIONS.auth.user,
								user.email,
								"login",
								`You have logged in your account from ${
									req.headers.user - agent
								} at ${moment().format()}`,
								[{ path: "./server/bot.gif" }]
							);
						}
					});
				}
			})(req, res, next);
			break;
		case "jwt":
			passport.authenticate("jwt", (err, user, info) => {})(req, res, next);
			break;
		case "google":
			passport.authenticate("jwt", (err, user, info) => {})(req, res, next);
			break;
		default:
			req.app.get("loggerInfo").info(`authentication method was not defined`);
			break;
	}
});

module.exports = router;
