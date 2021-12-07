const cartData = require("./data");

module.exports = {
	async getCarts(filters) {
		return cartData.getCarts(filters);
	},

	async addCartProduct(cart) {
		return cartData.addCartProduct(cart);
	},

	async updateCartProduct(record, fields) {
		return cartData.updateCartProduct(record, fields);
	},

	async deleteCartProduct(cart) {
		return cartData.deleteCartProduct(cart);
	},
};
