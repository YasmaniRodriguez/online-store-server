const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
	const DAO = req.app.get("dataHandler");
	const { email, password, role } = req.body;

	if (!email) {
		return res.status(422).json({ error: "You must enter an email address" });
	}

	if (!password) {
		return res.status(422).json({ error: "You must enter a password" });
	}

	const existingUser = DAO.getUsers(email);

	if (existingUser) {
		res.status(422).json({ error: "That email address is already in use" });
	}

	const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const myPromise = new Promise((resolve, reject) => {
		resolve(
			DAO.addUsers({
				email: email,
				password: encryptedPassword,
				role: role,
			})
		);
	});
	myPromise
		.then((result) => {
			res.status(200).json({ message: "user uploaded" });
		})
		.catch((error) => res.json(error));
});

module.exports = router;
