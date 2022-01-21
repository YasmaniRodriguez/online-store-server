const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
<<<<<<< HEAD
=======
	console.log(req.user);
>>>>>>> 4bf4e76df9233c03f6b1df29e09968ae285dc959
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
<<<<<<< HEAD
=======
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
>>>>>>> 4bf4e76df9233c03f6b1df29e09968ae285dc959
		  })
		: res.redirect("signin");
});

router.get("/home", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
<<<<<<< HEAD
=======
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
>>>>>>> 4bf4e76df9233c03f6b1df29e09968ae285dc959
		  })
		: res.redirect("signin");
});

router.get("/signin", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
<<<<<<< HEAD
=======
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
>>>>>>> 4bf4e76df9233c03f6b1df29e09968ae285dc959
		  })
		: res.render("signin");
});

router.get("/signup", (req, res) => {
	req.isAuthenticated()
		? res.render("home", {
				name: req.user.name,
				lastname: req.user.lastname,
				avatar: req.user.avatar,
<<<<<<< HEAD
=======
				birthday: req.user.birthday,
				phone: req.user.phone,
				email: req.user.email,
				address: req.user.address,
				role: req.user.role,
				cart: req.user.cart,
>>>>>>> 4bf4e76df9233c03f6b1df29e09968ae285dc959
		  })
		: res.render("signup", {});
});

module.exports = router;
