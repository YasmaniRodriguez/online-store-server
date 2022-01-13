const model = require("./model");

module.exports = {
	async getOrders(req, res) {
		const filters = req.query;
		try {
			const orders = await model.getOrders(filters);
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
			const record = await model.addOrders(order);
			res.status(201).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateOrders(req, res) {
		const order = req.params.id;
		const fields = req.body;
		try {
			const record = await model.updateOrders(order, fields);
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteOrders(req, res) {
		const order = req.params.id;
		try {
			const record = await model.deleteOrders(order);
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
