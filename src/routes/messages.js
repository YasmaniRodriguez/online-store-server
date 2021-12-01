const express = require("express");
const router = express.Router();
const service = require("../services/messaging.js").ShortMessageService;
const conf = require("../config.js");

const keywords = ["administrador"];

router.get("/messages", (req, res) => {
	const DAO = req.app.get("dataHandler");
	const myPromise = new Promise((resolve, reject) => {
		resolve(DAO.getMessages());
	});
	myPromise
		.then((result) => {
			result.length === 0
				? res.json({ error: "there is not messages" })
				: res.json({ messages: result });
		})
		.catch((error) => res.json(error));
});

router.post("/messages", (req, res) => {
	const DAO = req.app.get("dataHandler");
	const message = req.body;
	const findKeywords = keywords.some((word) => message.message.includes(word));
	const myPromise = new Promise((resolve, reject) => {
		resolve(DAO.addMessages(message));
	});
	myPromise
		.then(() => {
			if (findKeywords) {
				res.json({ message: "message uploaded" });
				const smsService = new service();
				smsService.SendMessage(
					conf.TWILIO_ACCOUNT_NUMBER,
					conf.ADMIN_PHONE_NUMBER,
					`User ${message.author.email} say: ${message.message}`
				);
			} else {
				res.json({ message: "message uploaded" });
			}
		})
		.catch((error) => res.json(error));
});

module.exports = router;
