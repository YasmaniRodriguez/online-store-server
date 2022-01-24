const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		author: {
			name: { type: String },
			lastname: { type: String },
			avatar: { type: String },
			email: { type: String },
			role: { type: String },
		},
		message: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("messages", schema);
