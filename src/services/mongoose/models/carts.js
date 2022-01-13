const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartRow = new Schema({
	product: {
		code: { type: String, unique: true },
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

const cart = new Schema(
	{
		buyer: {
			name: { type: String },
			lastname: { type: String },
			email: { type: String },
			phone: { type: String },
			address: { type: String },
		},
		products: [cartRow],
		totalAmount: { type: Number },
		totalQuantity: { type: Number },
		status: { type: Number },
	},
	{ timestamps: true }
);

cartRow.methods.calcAmount = async function () {
	try {
		return this.quantity * this.product.price;
	} catch (error) {
		return error.message;
	}
};

cart.methods.calcTotalAmount = async function () {
	try {
		const amount = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);
		return amount;
	} catch (error) {
		return error.message;
	}
};

cart.methods.calcTotalQty = async function () {
	try {
		const quantity = this.products.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.quantity;
		}, 0);
		return quantity;
	} catch (error) {
		return error.message;
	}
};

cartRow.pre("save", async function () {
	this.amount = await this.calcAmount();
});

cart.pre("save", async function () {
	this.totalAmount = await this.calcTotalAmount();
	this.totalQuantity = await this.calcTotalQty();
});

module.exports = mongoose.model("carts", cart);
