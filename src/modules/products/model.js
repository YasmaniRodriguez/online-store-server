const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getProducts(filters) {
		const result = await data.getProducts(filters);
		return deliverable("products", result);
	},

	async addProducts(product) {
		const result = await data.addProducts(product);
		return deliverable("products", result);
	},

	async updateProducts(product, fields) {
		const result = await data.updateProducts(product, fields);
		return deliverable("products", result);
	},

	async deleteProducts(product) {
		const result = await data.deleteProducts(product);
		return deliverable("products", result);
	},
};
