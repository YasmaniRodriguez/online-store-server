const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 100 },
		category: { type: String, required: true, max: 100 },
		image: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("products", schema);
