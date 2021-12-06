const MessageModel = require("./model");

module.exports = {
	async getMessages(req, res) {
		try {
			const filters = req.query;
			const messages = await MessageModel.getMessages(filters);
			messages.length === 0
				? res.json({ status: "error", message: "there is not messages" })
				: res.json({ messages });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async addMessages(req, res) {
		const message = req.body;
		try {
			await MessageModel.addMessages(message);
			res.json({ status: "ok", message: "message uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateMessages(req, res) {
		try {
			res.json({ status: "ok", message: "message updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteMessages(req, res) {
		try {
			res.json({ status: "ok", message: "message removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
