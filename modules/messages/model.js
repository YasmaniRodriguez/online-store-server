const MessageDal = require("./data");

module.exports = {
	async readMessages(filters) {
		return MessageDal.readMessages(filters);
	},

	async createMessages(filters) {
		return MessageDal.createMessages(filters);
	},

	async updateMessages(filters) {
		return MessageDal.updateMessages(filters);
	},

	async deleteMessages(filters) {
		return MessageDal.deleteMessages(filters);
	},
};
