const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const settings = require("../env.js");

const users = [
	{
		username: "root",
		password: "root",
		role: "owner",
	},
	{
		username: "guest",
		password: "guest",
		role: "customer",
	},
];

router.post("/login", (req, res) => {
	const { username, password } = req.body;
	const user = users.find((u) => {
		return u.username === username && u.password === password;
	});

	if (user) {
		const accessToken = jwt.sign(
			{ username: user.username, role: user.role },
			process.env.PRIVATE_KEY || settings.PRIVATE_KEY,
			{ expiresIn: "120m" }
		);
		req.session.role = user.role;
		req.session.token = accessToken;
		res.status(200).json({ message: "login success!" });
	} else {
		res.status(401).json({ message: "wrong username or password" });
	}
});

module.exports = router;
