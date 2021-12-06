const CartModel = require("./model");

module.exports = {
	async getCarts(req, res) {
		const filters = req.query;
		try {
			const carts = await CartModel.getCarts(filters);
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
			await CartModel.addCartProduct(cart);
			res.json({ status: "ok", message: "cart uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateCartProduct(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await CartModel.updateCartProduct(record, fields);
			res.json({ status: "ok", message: "cart updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteCartProduct(req, res) {
		const record = req.params.id;
		try {
			await CartModel.deleteCartProduct(record);
			res.json({ status: "ok", message: "cart removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
