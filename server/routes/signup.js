const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
	const DAO = req.app.get("dataHandler");
	const { name, gender, phone, email, password, confirm, role, tyc } = req.body;

	if (!email) {
		return res.status(422).json({ error: "you must enter an email address" });
	}

	if (!password) {
		return res.status(422).json({ error: "you must enter a password" });
	}

	if (password !== confirm) {
		return res.status(422).json({ error: "passwords are not the same" });
	}

	const existingUser = await DAO.getUsers(email);

	if (existingUser) {
		return res
			.status(422)
			.json({ error: "that email address is already in use" });
	}

	const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const myPromise = new Promise((resolve, reject) => {
		resolve(
			DAO.addUsers({
				name: name,
				gender: gender,
				phone: phone,
				email: email,
				password: encryptedPassword,
				role: role,
				tyc: tyc,
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
