const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const config = require("../../../config");

const tokens = new Schema({
	token: { type: String, required: true, expires: "5m" },
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
	const token = jwt.sign(
		{ sub: this._id, iat: Date.now() },
		config.JWT_SECRET,
		{
			expiresIn: "120m",
		}
	);
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

profiles.methods.emptyTheCart = async function () {
	const empty = {
		totalAmount: 0,
		totalQuantity: 0,
		status: 0,
		products: [],
	};
	this.cart = empty;
	await this.save();
	return this.cart;
};

cartRow.methods.calcAmount = async function () {
	try {
		return this.quantity * this.product.price;
	} catch (error) {
		return error.message;
	}
};

cart.methods.calcTotalAmount = async function () {
	try {
		const value = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);
		return value;
	} catch (error) {
		return error.message;
	}
};

cart.methods.calcTotalQty = async function () {
	try {
		const value = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.quantity;
		}, 0);
		return value;
	} catch (error) {
		return error.message;
	}
};

cartRow.pre("save", async function () {
	return (this.amount = await this.calcAmount());
});

cart.pre("save", async function () {
	return (this.totalQuantity = await this.calcTotalQty());
});

cart.pre("save", async function () {
	return (this.totalAmount = await this.calcTotalAmount());
});

module.exports = mongoose.model("profiles", profiles);
