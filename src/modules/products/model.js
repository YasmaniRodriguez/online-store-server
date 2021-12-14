const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getProducts(filters) {
		return dataHandler.getProducts(filters);
	},

	async addProducts(product) {
		return dataHandler.addProducts(product);
	},

	async updateProducts(product, fields) {
		return dataHandler.updateProducts(product, fields);
	},

	async deleteProducts(product) {
		return dataHandler.deleteProducts(product);
	},
};
