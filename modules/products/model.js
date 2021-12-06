const ProductData = require("./data");

module.exports = {
	async readProducts(filters) {
		return ProductData.readProducts(filters);
	},

	async createProducts(filters) {
		return ProductData.createProducts(filters);
	},

	async updateProducts(filters) {
		return ProductData.updateProducts(filters);
	},

	async deleteProducts(filters) {
		return ProductData.deleteProducts(filters);
	},
};
