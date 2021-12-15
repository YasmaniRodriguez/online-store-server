const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		lastname: { type: String, required: true },
		birthday: { type: Date },
		avatar: { type: String },
		phone: { type: String, unique: true, required: true },
		email: { type: String, lowercase: true, unique: true, required: true },
		address: { type: String },
		password: { type: String },
		role: { type: String, enum: ["customer", "owner"], default: "customer" },
		tyc: { type: Boolean },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("profiles", profileSchema);
