const cartModel = require("./model");

module.exports = {
	async getCarts(req, res) {
		const filters = req.query;
		try {
			const carts = await cartModel.getCarts(filters);
			carts.length === 0
				? res.json({ status: "error", message: "there is not carts" })
				: res.json(carts);
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async addCartProduct(req, res) {
		const cart = req.body;
		try {
			await cartModel.addCartProduct(cart);
			res.json({ status: "ok", message: "cart uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateCartProduct(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await cartModel.updateCartProduct(record, fields);
			res.json({ status: "ok", message: "cart updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteCartProduct(req, res) {
		const record = req.params.id;
		try {
			await cartModel.deleteCartProduct(record);
			res.json({ status: "ok", message: "cart removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
