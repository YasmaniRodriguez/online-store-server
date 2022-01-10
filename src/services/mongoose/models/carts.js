const mongoose = require("mongoose");
const { Schema } = mongoose;

const child = new Schema({
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

const parent = new Schema(
	{
		buyer: {
			name: { type: String },
			lastname: { type: String },
			email: { type: String },
			phone: { type: String },
			address: { type: String },
		},
		products: [child],
		totalAmount: { type: Number },
		totalQuantity: { type: Number },
		status: { type: Number },
	},
	{ timestamps: true }
);

child.methods.calcAmount = async function () {
	const row = this;
	try {
		return row.quantity * row.product.price;
	} catch (error) {
		return error.message;
	}
};

parent.methods.calcTotalAmount = async function () {
	const cart = this;
	try {
		const amount = cart.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);
		return amount;
	} catch (error) {
		return error.message;
	}
};

parent.methods.calcTotalQty = async function () {
	const cart = this;
	try {
		const quantity = cart.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.quantity;
		}, 0);
		return quantity;
	} catch (error) {
		return error.message;
	}
};

child.pre("save", async function () {
	const row = this;
	row.amount = await row.calcAmount();
});

parent.pre("save", async function () {
	const cart = this;
	cart.totalAmount = await cart.calcTotalAmount();
	cart.totalQuantity = await cart.calcTotalQty();
});

module.exports = mongoose.model("carts", parent);
