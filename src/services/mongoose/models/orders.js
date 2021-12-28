const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		buyer: {
			name: { type: String },
			lastname: { type: String },
			email: { type: String },
			phone: { type: String },
			address: { type: String },
		},
		products: { type: Array },
		totalAmount: { type: Number },
		totalQuantity: { type: Number },
		status: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
