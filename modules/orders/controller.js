const OrderModel = require("./model");

module.exports = {
	async getOrders(req, res) {
		const filters = req.query;
		try {
			const orders = await OrderModel.getOrders(filters);
			orders.length === 0
				? res.json({ status: "error", message: "there is not orders" })
				: res.json(orders);
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async addOrders(req, res) {
		const order = req.body;
		try {
			await OrderModel.addOrders(order);
			res.json({ status: "ok", message: "order uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateOrders(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await OrderModel.updateOrders(record, fields);
			res.json({ status: "ok", message: "order updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteOrders(req, res) {
		const record = req.params.id;
		try {
			await OrderModel.deleteOrders(record);
			res.json({ status: "ok", message: "order removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
