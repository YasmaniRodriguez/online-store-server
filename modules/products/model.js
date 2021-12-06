const ProductData = require("./data");

module.exports = {
	async getProducts(filters) {
		return ProductData.getProducts(filters);
	},

	async addProducts(product) {
		return ProductData.addProducts(product);
	},

	async updateProducts(record, fields) {
		return ProductData.updateProducts(record, fields);
	},

	async deleteProducts(product) {
		return ProductData.deleteProducts(product);
	},
};
