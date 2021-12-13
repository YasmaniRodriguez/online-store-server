const cartData = require("./data");

module.exports = {
	async getCarts(filters) {
		return cartData.getCarts(filters);
	},

	async addCartProduct(filters) {
		return cartData.addCartProduct(filters);
	},

	async updateCartProduct(filters) {
		return cartData.updateCartProduct(filters);
	},

	async deleteCartProduct(filters) {
		return cartData.deleteCartProduct(filters);
	},
};
