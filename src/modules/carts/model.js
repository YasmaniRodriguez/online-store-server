const cartData = require("./data");
const dataHandler = require("../../utils/function").getDataHandler();

module.exports = {
	async getCarts(filters) {
		return cartData.getCarts(filters);
	},
	/////////////////////////////////
	async addCartProducts(filters) {
		const data = await dataHandler.addCartProducts(filters);
		return data;
	},

	async updateCartProducts(filters) {
		const data = await dataHandler.updateCartProducts(filters);
		return data;
	},

	async deleteCartProducts(filters) {
		const data = await dataHandler.deleteCartProducts(filters);
		return data;
	},
};
