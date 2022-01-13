const config = require("../../config");
const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getMessages(filters) {
		const result = await data.getMessages(filters);
		return result;
	},

	async addMessages(message) {
		const keywords = ["administrador"];
		const findKeywords = keywords.some((word) =>
			message.message.includes(word)
		);
		if (findKeywords) {
			const smsService = new service();
			smsService.SendMessage(
				config.TWILIO_ACCOUNT_NUMBER,
				config.ADMIN_PHONE_NUMBER,
				`User ${message.author.email} say: ${message.message}`
			);
			const result = await data.addMessages(message);
			return result;
		} else {
			const result = await data.addMessages(message);
			return result;
		}
	},

	async updateMessages(record, fields) {
		const result = await data.updateMessages(record, fields);
		return result;
	},

	async deleteMessages(message) {
		const result = await data.deleteMessages(message);
		return result;
	},
};
