const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../../config");

const schema = new mongoose.Schema(
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
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

schema.methods.newAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ sub: user._id, iat: Date.now() },
		config.JWT_SECRET,
		{
			expiresIn: "120m",
		}
	);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

module.exports = mongoose.model("profiles", schema);
