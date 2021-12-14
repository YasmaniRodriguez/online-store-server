//const OrderData = require("./data");
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getOrders(filters) {
		return dataHandler.getOrders(filters);
		//return OrderData.getOrders(filters);
	},

	async addOrders(order) {
		return dataHandler.addOrders(order);
		//return OrderData.addOrders(order);
	},

	async updateOrders(record, fields) {
		return dataHandler.updateOrders(record, fields);
		//return OrderData.updateOrders(record, fields);
	},

	async deleteOrders(order) {
		return dataHandler.deleteOrders(order);
		//return OrderData.deleteOrders(order);
	},
};
