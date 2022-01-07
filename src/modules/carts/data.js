const { Order, OrderRow } = require("../../utils/class");
const dataHandler = require("../../utils/function").getDataHandler();

const cart = [];

module.exports = {
	async getCarts(filters) {
		const { ouid, buyer } = filters;
		const preview = [];
		try {
			preview.push(new Order(ouid, 0, buyer, cart, null, null));
			return preview;
		} catch (error) {
			return error;
		}
	},

	async addCartProduct(filters) {
		const { product, quantity } = filters;
		try {
			const data = dataHandler.getProducts({ code: product });
			cart.push(new OrderRow(cart.length + 1, data[0], quantity, null));
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
