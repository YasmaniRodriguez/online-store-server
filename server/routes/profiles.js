const express = require("express");
const router = express.Router();

router.get("/profiles", (req, res) => {
	const dataHandler = req.app.get("dataHandler");
	const myself = req.session.passport.user._id;
	const myPromise = new Promise((resolve, reject) => {
		resolve(dataHandler.getUsers(myself));
	});
	myPromise
		.then((result) => {
			result.length === 0
				? res.json({ error: "this profile does not exist" })
				: res.json({ users: result });
		})
		.catch((error) => res.json(error));
});

router.put("/profiles", (req, res) => {
	const dataHandler = req.app.get("dataHandler");
	const myself = req.session.passport.user._id;
	const fields = req.body;
	const avatar = req.file ? `/images/${req.file.filename}` : req.file;
	console.log(avatar);
	const myPromise = new Promise((resolve, reject) => {
		resolve(
			dataHandler.updateUsers(myself, {
				...fields,
				avatar,
			})
		);
	});
	myPromise
		.then(() => {
			res.json({ message: "profile was updated" });
		})
		.catch((error) => res.json(error));
});

module.exports = router;
