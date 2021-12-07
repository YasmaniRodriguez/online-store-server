const productData = require("./data");

module.exports = {
	async getProducts(filters) {
		return productData.getProducts(filters);
	},

	async addProducts(product) {
		return productData.addProducts(product);
	},

	async updateProducts(record, fields) {
		return productData.updateProducts(record, fields);
	},

	async deleteProducts(product) {
		return productData.deleteProducts(product);
	},
};
