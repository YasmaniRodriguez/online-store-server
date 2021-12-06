const ProductModel = require("./model");

module.exports = {
	async getProducts(req, res) {
		const filters = req.query;
		try {
			const products = await ProductModel.getProducts(filters);
			products.length === 0
				? res.json({ status: "error", message: "there is not products" })
				: res.json(products);
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async addProducts(req, res) {
		const product = req.body;
		try {
			await ProductModel.addProducts(product);
			res.json({ status: "ok", message: "product uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateProducts(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await ProductModel.updateProducts(record, fields);
			res.json({ status: "ok", message: "product updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteProducts(req, res) {
		const record = req.params.id;
		try {
			await ProductModel.deleteProducts(record);
			res.json({ status: "ok", message: "product removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
