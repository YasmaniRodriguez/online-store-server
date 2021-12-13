const OrderData = require("./data");

module.exports = {
	async getOrders(filters) {
		return OrderData.getOrders(filters);
	},

	async addOrders(order) {
		return OrderData.addOrders(order);
	},

	async updateOrders(record, fields) {
		return OrderData.updateOrders(record, fields);
	},

	async deleteOrders(order) {
		return OrderData.deleteOrders(order);
	},
};
