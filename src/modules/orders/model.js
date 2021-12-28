const dataHandler = require("../../utils/function").getDataHandler();
const { deliverableObject } = require("../../utils/dto");

module.exports = {
	async getOrders(filters) {
		return dataHandler.getOrders(filters);
	},

	async addOrders(order) {
		return dataHandler.addOrders(order);
	},

	async updateOrders(record, fields) {
		return dataHandler.updateOrders(record, fields);
	},

	async deleteOrders(order) {
		return dataHandler.deleteOrders(order);
	},
};
