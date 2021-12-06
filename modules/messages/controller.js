const MessageModel = require("./model");

module.exports = {
	async getMessages(req, res) {
		const filters = req.query;
		try {
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
		const record = req.params.id;
		const fields = req.body;
		try {
			await MessageModel.updateMessages(record, fields);
			res.json({ status: "ok", message: "message updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteMessages(req, res) {
		const record = req.params.id;
		try {
			await MessageModel.deleteMessages(record);
			res.json({ status: "ok", message: "message removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
