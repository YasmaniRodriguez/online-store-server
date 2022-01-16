const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getCarts(filters) {
		const result = await data.getCarts(filters);
		return deliverable("carts", result);
	},

	async addCartProducts(fields) {
		const result = await data.addCartProducts(fields);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			return deliverable("carts", result);
		}
	},

	async updateCartProducts(filters) {
		const result = await data.updateCartProducts(filters);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			return deliverable("carts", result);
		}
	},

	async deleteCartProducts(filters) {
		const result = await data.deleteCartProducts(filters);
		if (result.toString().split(": ", 1)[0] === "Error") {
			return false;
		} else {
			return deliverable("carts", result);
		}
	},
};
