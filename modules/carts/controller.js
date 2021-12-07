const cartModel = require("./model");

module.exports = {
	async getCarts(req, res) {
		const filters = req.query;
		try {
			const carts = await cartModel.getCarts(filters);
			carts.length === 0
				? res.status(202).json({
						status: "error",
						message: "there are not products in the cart",
				  })
				: res.status(200).json(carts);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addCartProduct(req, res) {
		const cart = req.body;
		try {
			await cartModel.addCartProduct(cart);
			res.status(201).json({ status: "ok", message: "cart uploaded" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateCartProduct(req, res) {
		const record = req.params.id;
		const fields = req.body;
		try {
			await cartModel.updateCartProduct(record, fields);
			res.status(200).json({ status: "ok", message: "cart updated" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteCartProduct(req, res) {
		const record = req.params.id;
		try {
			await cartModel.deleteCartProduct(record);
			res.status(200).json({ status: "ok", message: "cart removed" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
