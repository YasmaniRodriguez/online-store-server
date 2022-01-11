const cartData = require("./data");
const dataHandler = require("../../utils/function").getDataHandler();

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
	/////////////////////////////////
	async addProductToCart(filters) {
		const data = await dataHandler.addProductToCart(filters);
		return data;
	},

	async deleteProductToCart(filters) {
		const data = await dataHandler.deleteProductToCart(filters);
		return data;
	},
};
