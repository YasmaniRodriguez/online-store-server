const MessageData = require("./data");
const normalize = require("../../services/normalizr").getNormalizedData;
const schema = require("../../services/normalizr/schemas/messages");
const conf = require("../../config");

module.exports = {
	async getMessages(filters) {
		const data = await MessageData.getMessages(filters);
		return conf.DATA_NORMALIZATION ? normalize(data, schema) : data;
	},

	async addMessages(message) {
		const keywords = ["administrador"];
		const findKeywords = keywords.some((word) =>
			message.message.includes(word)
		);
		if (findKeywords) {
			const smsService = new service();
			smsService.SendMessage(
				conf.TWILIO_ACCOUNT_NUMBER,
				conf.ADMIN_PHONE_NUMBER,
				`User ${message.author.email} say: ${message.message}`
			);
			return MessageData.addMessages(message);
		} else {
			return MessageData.addMessages(message);
		}
	},

	async updateMessages(record, fields) {
		return MessageData.updateMessages(record, fields);
	},

	async deleteMessages(message) {
		return MessageData.deleteMessages(message);
	},
};
