const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		author: {
			name: { type: String },
			lastname: { type: String },
			avatar: { type: String },
			email: { type: String },
		},
		message: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);
