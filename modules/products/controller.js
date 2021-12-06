const ProductModel = require("./model");

module.exports = {
	async readProducts(req, res) {
		const filters = req.query;
		try {
			const products = await ProductModel.readProducts(filters);
			products.length === 0
				? res.json({ status: "error", message: "there is not products" })
				: res.json(products);
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async createProducts(req, res) {
		const { code, name, category, description, image, price, stock } = req.body;
		try {
			await ProductModel.createProducts({
				code,
				name,
				category,
				description,
				image,
				price,
				stock,
			});
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
