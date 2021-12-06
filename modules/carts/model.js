const CartData = require("./data");
const conf = require("../../config");

module.exports = {
	async getCarts(filters) {
		return CartData.getCarts(filters);
	},

	async addCarts(cart) {
		return CartData.addCartProduct(cart);
	},

	async updateCarts(record, fields) {
		return CartData.updateCartProduct(record, fields);
	},

	async deleteCarts(cart) {
		return CartData.deleteCartProduct(cart);
	},
};
