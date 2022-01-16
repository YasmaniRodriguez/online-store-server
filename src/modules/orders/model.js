const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;
const config = require("../../config");
const service = require("../../services/nodemailer");
const email = new service();

module.exports = {
	async getOrders(filters) {
		const result = await data.getOrders(filters);
		return deliverable("orders", result);
	},

	async addOrders(fields) {
		const result = await data.addOrders(fields);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			await email.SendMessage(
				"gmail",
				config.GMAIL_USER,
				fields.email,
				"order",
				`A new order has occurred`,
				result
			);
			return deliverable("orders", result);
		}
	},

	async updateOrders(record, fields) {
		const result = await data.updateOrders(record, fields);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			return deliverable("orders", result);
		}
	},

	async deleteOrders(order) {
		const result = await data.deleteOrders(order);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			return deliverable("orders", result);
		}
	},
};
