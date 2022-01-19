const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("home");
});

router.get("/home", (req, res) => {
	res.render("home", {});
});

router.get("/signin", (req, res) => {
	res.render("signin", {});
});

router.get("/signup", (req, res) => {
	res.render("signup", {});
});

module.exports = router;
