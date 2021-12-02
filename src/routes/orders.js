const express = require("express");
const router = express.Router();

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

	try {
		dataHandler.addOrders(order);
		return res.json({ message: "order uploaded" });
	} catch (e) {
		res.json(e);
	}
});

module.exports = router;
