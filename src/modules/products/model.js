const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();
const DTO = require("../../utils/dto");

module.exports = {
	async getProducts(filters) {
		const products = await dataHandler.getProducts(filters);
		return DTO.productDeliverableObject(products);
	},

	async addProducts(product) {
		const products = await dataHandler.addProducts(product);
		return DTO.productDeliverableObject(products);
	},

	async updateProducts(product, fields) {
		const products = await dataHandler.updateProducts(product, fields);
		return DTO.productDeliverableObject(products);
	},

	async deleteProducts(product) {
		return dataHandler.deleteProducts(product);
	},
};
