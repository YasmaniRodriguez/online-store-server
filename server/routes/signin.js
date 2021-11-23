const express = require("express");
const router = express.Router();
const passport = require("passport");

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
						if (err) throw err;
						res
							.status(200)
							.json({ message: "successfully authenticated user" });
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
