const messages = require("../../services/mongodb/models/messages");

module.exports = {
	async getMessages(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await messages.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await messages.find({ filters }, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	},

	async addMessages(message) {
		try {
			const newMessage = new messages(message);
			await newMessage.save();
		} catch (error) {
			return error;
		}
	},

	async updateMessages(message = null, fields) {
		try {
		} catch (error) {
			return error;
		}
	},

	async deleteMessages(message = null) {
		try {
		} catch (error) {
			return error;
		}
	},
};
