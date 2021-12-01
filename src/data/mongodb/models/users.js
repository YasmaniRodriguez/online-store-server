const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		gender: { type: String },
		phone: { type: String, unique: true, required: true },
		address: { type: String },
		birthday: { type: Date },
		avatar: { type: String },
		email: { type: String, lowercase: true, unique: true, required: true },
		password: { type: String },
		role: { type: String, enum: ["customer", "owner"], default: "customer" },
		tyc: { type: Boolean },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
