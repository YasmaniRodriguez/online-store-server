const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokens = new Schema(
	{
		profile: { type: String, require: true },
		token: { type: String, required: true },
	},
	{ timestamps: true }
);

tokens.path("updatedAt").index({ expires: 60 * 60 });

module.exports = mongoose.model("tokens", tokens);
