const OrderModel = require("./model");

module.exports = {
	async getOrders(req, res) {
		const filters = req.query;
		try {
			const orders = await OrderModel.getOrders(filters);
			orders.length === 0
				? res
						.status(202)
						.json({ status: "error", message: "there is not orders" })
				: res.status(200).json(orders);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addOrders(req, res) {
		const order = req.body;
		try {
			await OrderModel.addOrders(order);
			res.status(201).json({ status: "ok", message: "order uploaded" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateOrders(req, res) {
		const order = req.params.id;
		const fields = req.body;
		try {
			const record = await OrderModel.updateOrders(order, fields);
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteOrders(req, res) {
		const record = req.params.id;
		try {
			await OrderModel.deleteOrders(record);
			res.status(200).json({ status: "ok", message: "order removed" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
