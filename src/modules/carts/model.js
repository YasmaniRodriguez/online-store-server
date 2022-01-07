const cartData = require("./data");

module.exports = {
	async getCarts(filters) {
		return cartData.getCarts(filters);
	},

	async addCartProducts(filters) {
		return cartData.addCartProducts(filters);
	},

	async updateCartProducts(filters) {
		return cartData.updateCartProducts(filters);
	},

	async deleteCartProducts(filters) {
		return cartData.deleteCartProducts(filters);
	},
};
