const template = require("../../utils/classes");
const products = require("../../services/mongodb/models/products");
const moment = require("moment");

const cart = [];

module.exports = {
	async getCarts(filters) {
		const { ouid, buyer } = filters;
		const preview = [];
		try {
			preview.push(new template.Order(ouid, 0, buyer, cart, null, null));
			return preview;
		} catch (error) {
			return error;
		}
	},

	async addCartProduct(filters) {
		const { product, quantity } = filters;
		try {
			const data = await products.find({ code: product }, { __v: 0 }).lean();
			cart.push(
				new template.OrderRow(cart.length + 1, data[0], quantity, null)
			);
			const preview = cart.filter((obj) => obj.product.code === product);
			return preview[0];
		} catch (error) {
			return error;
		}
	},

	async updateCartProduct(filters) {
		const { product, quantity } = filters;
		try {
			const data = await cart.find((row) => row.product.code === product);
			data.setQuantity(quantity);
			const preview = cart.filter((obj) => obj.product.code === product);
			return preview[0];
		} catch (error) {
			return error;
		}
	},

	async deleteCartProduct(filters) {
		const { product } = filters;
		try {
			const data = await cart.find((row) => row.product.code === product);
			const preview = { name: data.product.name, row: data.row };
			if (data === undefined) {
				return false;
			} else {
				let i = cart.indexOf(data);
				if (i !== -1) {
					cart.splice(i, 1);
				}
				return preview;
			}
		} catch (error) {
			return error;
		}
	},
};
