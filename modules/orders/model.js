const OrderData = require("./data");

module.exports = {
	async getOrders(filters) {
		return ProductData.getOrders(filters);
	},

	async addOrders(order) {
		return ProductData.addOrders(order);
	},

	async updateOrders(record, fields) {
		return ProductData.updateOrders(record, fields);
	},

	async deleteOrders(order) {
		return ProductData.deleteOrders(order);
	},
};
