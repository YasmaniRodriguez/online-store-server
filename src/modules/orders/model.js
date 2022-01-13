const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getOrders(filters) {
		const result = await data.getOrders(filters);
		return result;
	},

	async addOrders(order) {
		const result = await data.addOrders(order);
		return result;
	},

	async updateOrders(record, fields) {
		const result = await data.updateOrders(record, fields);
		return result;
	},

	async deleteOrders(order) {
		const result = await data.deleteOrders(order);
		return result;
	},
};
