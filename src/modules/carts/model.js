const cartData = require("./data");
const data = require("../../utils/function").getDataHandler();

module.exports = {
	async getCarts(filters) {
		return cartData.getCarts(filters);
	},
	/////////////////////////////////
	async addCartProducts(filters) {
		const result = await data.addCartProducts(filters);
		return result;
	},

	async updateCartProducts(filters) {
		const result = await data.updateCartProducts(filters);
		return result;
	},

	async deleteCartProducts(filters) {
		const result = await data.deleteCartProducts(filters);
		return result;
	},
};
