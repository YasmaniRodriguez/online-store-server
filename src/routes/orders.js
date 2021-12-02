const express = require("express");
const router = express.Router();
const service = require("../services/messaging.js");

router.get("/orders", async (req, res) => {
	const dataHandler = req.app.get("dataHandler");
	const filters = req.query;

	try {
		const orders = await dataHandler.getOrders(filters);
		orders.length === 0
			? res.json({ error: "there is not orders" })
			: res.json({ orders });
	} catch (e) {
		res.json(e);
	}
});

router.post("/orders", (req, res) => {
	const dataHandler = req.app.get("dataHandler");
	const order = req.body;

	const emailService = new service.Email();
	const smsService = new service.ShortMessageService();
	const whatsappService = new service.Whatsapp();

	try {
		dataHandler.addOrders(order);
		res.json({ message: "order uploaded" });
		emailService.SendMessage(
			"ethereal",
			conf.ETHEREAL_OPTIONS.auth.user,
			conf.ETHEREAL_OPTIONS.auth.user,
			"order",
			`You have a new Order from ${order.buyer.name}(${order.buyer.email})`
		);
		whatsappService.SendMessage(
			conf.TWILIO_ACCOUNT_NUMBER,
			conf.ADMIN_PHONE_NUMBER,
			`Hi, wake up! You have a new Order from ${order.buyer.name}(${order.buyer.email})`
		);
		smsService.SendMessage(
			conf.TWILIO_ACCOUNT_NUMBER,
			order.buyer.phone,
			`Your order was received and is in the process of preparation. You can track it with the following code: ${order.code}`
		);
	} catch (e) {
		res.json(e);
	}
});

module.exports = router;
