const CartData = require("./data");

module.exports = {
	async getCarts(filters) {
		return CartData.getCarts(filters);
	},

	async addCartProduct(cart) {
		return CartData.addCartProduct(cart);
	},

	async updateCartProduct(record, fields) {
		return CartData.updateCartProduct(record, fields);
	},

	async deleteCartProduct(cart) {
		return CartData.deleteCartProduct(cart);
	},
};
