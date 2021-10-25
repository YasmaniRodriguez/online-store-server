const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, lowercase: true, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["customer", "owner"], default: "customer" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
