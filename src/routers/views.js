const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
		  })
		: res.redirect("signin");
});

router.get("/home", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
		  })
		: res.redirect("signin");
});

router.get("/signin", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
		  })
		: res.render("signin");
});

router.get("/signup", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
		  })
		: res.render("signup", {});
});

module.exports = router;
