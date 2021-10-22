const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
	const DAO = req.app.get("dataHandler");
	const myPromise = new Promise((resolve, reject) => {
		resolve(DAO.getUsers());
	});
	myPromise
		.then((result) => {
			result.length === 0
				? res.json({ error: "there is not users" })
				: res.json({ users: result });
		})
		.catch((error) => res.json(error));
});

router.post("/users", (req, res) => {
	const DAO = req.app.get("dataHandler");
	const user = req.body;
	const myPromise = new Promise((resolve, reject) => {
		resolve(DAO.addUsers(user));
	});
	myPromise
		.then(() => {
			res.json({ message: "user uploaded" });
		})
		.catch((error) => res.json(error));
});

module.exports = router;
