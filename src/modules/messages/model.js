const normalize = require("../../services/normalizr").getNormalizedData;
const schema = require("../../services/normalizr/schemas/messages");
const config = require("../../config");
const dataHandler = require("../../utils/function").getDataHandler();
const { deliverableObject } = require("../../utils/dto");

module.exports = {
	async getMessages(filters) {
		const data = await dataHandler.getMessages(filters);
		return data;
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
			return dataHandler.addMessages(message);
		} else {
			return dataHandler.addMessages(message);
		}
	},

	async updateMessages(record, fields) {
		return dataHandler.updateMessages(record, fields);
	},

	async deleteMessages(message) {
		return dataHandler.deleteMessages(message);
	},
};
