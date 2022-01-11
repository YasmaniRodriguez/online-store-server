const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const config = require("../../../config");

const tokens = new Schema({
	token: { type: String, required: true },
});

const cartRow = new Schema({
	product: {
		code: { type: String },
		name: { type: String },
		description: { type: String },
		category: { type: String },
		image: { type: String },
		price: { type: Number },
		stock: { type: Number },
	},
	quantity: { type: Number },
	amount: { type: Number },
});

const cart = new Schema({
	totalAmount: { type: Number, default: 0 },
	totalQuantity: { type: Number, default: 0 },
	status: { type: Number, default: 0 },
	products: [cartRow],
});

const profiles = new Schema(
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
		tokens: [tokens],
		cart: cart,
	},
	{ timestamps: true }
);

profiles.methods.newAuthToken = async function () {
	const profile = this;
	const token = jwt.sign(
		{ sub: profile._id, iat: Date.now() },
		config.JWT_SECRET,
		{
			expiresIn: "120m",
		}
	);
	profile.tokens = profile.tokens.concat({ token });
	await profile.save();
	return token;
};

profiles.methods.emptyCart = async function () {
	const profile = this;
	const empty = {
		totalAmount: 0,
		totalQuantity: 0,
		status: 0,
		products: [],
	};
	profile.cart = empty;
	await profile.save();
	return profile.cart;
};

module.exports = mongoose.model("profiles", profiles);
