const dataHandler = require("../../utils/function").getDataHandler();
const { deliverableObject } = require("../../utils/dto");

module.exports = {
	async getProducts(filters) {
		const products = await dataHandler.getProducts(filters);
		return deliverableObject("products", products);
	},

	async addProducts(product) {
		const products = await dataHandler.addProducts(product);
		return deliverableObject("products", products);
	},

	async updateProducts(product, fields) {
		const products = await dataHandler.updateProducts(product, fields);
		return deliverableObject("products", products);
	},

	async deleteProducts(product) {
		return dataHandler.deleteProducts(product);
	},
};
