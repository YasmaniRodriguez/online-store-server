const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	req.isAuthenticated() ? res.redirect("home") : res.redirect("signin");
});

router.get("/home", (req, res) => {
	req.isAuthenticated() ? res.render("home", {}) : res.redirect("signin");
});

router.get("/signin", (req, res) => {
	req.isAuthenticated() ? res.render("home", {}) : res.render("signin");
});

router.get("/signup", (req, res) => {
	req.isAuthenticated() ? res.render("home", {}) : res.render("signup", {});
});

module.exports = router;
