const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const settings = require("../env.js");

router.post("/login", (req, res) => {
	const DAO = req.app.get("dataHandler");
	const { username, password } = req.body;
	const myPromise = new Promise((resolve, reject) => {
		resolve(DAO.getUsers(username, password));
	});
	myPromise
		.then((result) => {
			if (result.length === 0) {
				res.status(401).json({ message: "wrong username or password" });
			} else {
				const user = result[0];
				const accessToken = jwt.sign(
					{ username: user.username, role: user.role },
					process.env.PRIVATE_KEY || settings.PRIVATE_KEY,
					{ expiresIn: "120m" }
				);
				req.session.role = user.role;
				req.session.token = accessToken;
				res.status(200).json({ message: "login success!" });
			}
		})
		.catch((error) => res.json(error));
});

module.exports = router;
