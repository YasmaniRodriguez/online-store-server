const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		code: { type: String },
		status: { type: Number },
		buyer: { type: Array },
		products: { type: Array },
		totalAmount: { type: Number },
		totalQuantity: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
