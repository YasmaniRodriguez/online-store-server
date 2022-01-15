const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getCarts(filters) {
		const result = await data.getCarts(filters);
		return deliverable("carts", result);
	},

	async addCartProducts(filters) {
		const result = await data.addCartProducts(filters);
		return deliverable("carts", result);
	},

	async updateCartProducts(filters) {
		const result = await data.updateCartProducts(filters);
		return deliverable("carts", result);
	},

	async deleteCartProducts(filters) {
		const result = await data.deleteCartProducts(filters);
		return deliverable("carts", result);
	},
};
