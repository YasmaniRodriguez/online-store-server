//const productData = require("./data");
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getProducts(filters) {
		return dataHandler.getProducts(filters);
		//return productData.getProducts(filters);
	},

	async addProducts(product) {
		return dataHandler.addProducts(product);
		//return productData.addProducts(product);
	},

	async updateProducts(product, fields) {
		return dataHandler.updateProducts(product, fields);
		//return productData.updateProducts(product, fields);
	},

	async deleteProducts(product) {
		return dataHandler.deleteProducts(product);
		//return productData.deleteProducts(product);
	},
};
