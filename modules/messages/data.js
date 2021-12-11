const messages = require("../../services/mongoose/models/messages");

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
			return !message
				? await messages.updateMany({}, { $set: fields }, { multi: true })
				: await messages.updateOne(
						{ code: { $eq: message } },
						{ $set: fields },
						{ multi: true }
				  );
		} catch (error) {
			return error;
		}
	},

	async deleteMessages(message = null) {
		try {
			return !message
				? await messages.deleteMany({})
				: messages.deleteOne({ code: { $eq: message } });
		} catch (error) {
			return error;
		}
	},
};
