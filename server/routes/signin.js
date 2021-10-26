const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/signin", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			res.status(401).json({ error: "wrong user or password" });
		} else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.status(200).json({ message: "successfully authenticated user" });
			});
		}
	})(req, res, next);
});

module.exports = router;
