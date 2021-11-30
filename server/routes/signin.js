const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const service = require("../services/messaging.js").Email;
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
							const email = new service();
							res
								.status(200)
								.json({ message: "successfully authenticated user" });
							//ethereal notification:
							email.SendMessage(
								"ethereal",
								conf.ETHEREAL_OPTIONS.auth.user,
								conf.ETHEREAL_OPTIONS.auth.user,
								"login",
								`login ${req.sessionID} ${moment().format()}`
							);
							//gmail notification:
							email.SendMessage(
								"gmail",
								conf.GMAIL_OPTIONS.auth.user,
								user.email,
								"login",
								`You have logged in your account at ${moment().format()}`,
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
