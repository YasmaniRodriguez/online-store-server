const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		gender: { type: String },
		phone: { type: String },
		email: { type: String, lowercase: true, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["customer", "owner"], default: "customer" },
		tyc: { type: Boolean },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
