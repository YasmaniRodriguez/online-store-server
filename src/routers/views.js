const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
		  })
		: res.redirect("signin");
});

router.get("/home", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
		  })
		: res.redirect("signin");
});

router.get("/signin", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
		  })
		: res.render("signin");
});

router.get("/signup", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
		  })
		: res.render("signup", {});
});

module.exports = router;
