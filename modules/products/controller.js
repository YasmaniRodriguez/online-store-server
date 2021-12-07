const productModel = require("./model");

module.exports = {
	async getProducts(req, res) {
		const filters = req.query;
		try {
			const products = await productModel.getProducts(filters);
			products.length === 0
				? res
						.status(202)
						.json({ status: "error", message: "there is not products" })
				: res.status(200).json(products);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addProducts(req, res) {
		const product = req.body;
		try {
			await productModel.addProducts(product);
			res.status(201).json({ status: "ok", message: "product uploaded" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateProducts(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await productModel.updateProducts(record, fields);
			res.status(200).json({ status: "ok", message: "product updated" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteProducts(req, res) {
		const record = req.params.id;
		try {
			await productModel.deleteProducts(record);
			res.status(200).json({ status: "ok", message: "product removed" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
