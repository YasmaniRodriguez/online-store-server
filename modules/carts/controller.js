const cartModel = require("./model");

module.exports = {
	async getCarts(req, res) {
		const buyer = {
			name: req.user.name,
			phone: req.user.phone,
			email: req.user.email,
			address: req.user.address,
		};
		const ouid = `${req.user._id}-${req.sessionID}`;

		try {
			const carts = await cartModel.getCarts({ ouid, buyer });
			carts
				? res.status(200).json(carts)
				: res
						.status(202)
						.json({ status: "error", message: "something is wrong" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addCartProduct(req, res) {
		const { product, quantity } = req.body;
		try {
			const record = await cartModel.addCartProduct({ product, quantity });
			res.status(201).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateCartProduct(req, res) {
		const { product, quantity } = req.body;
		try {
			const record = await cartModel.updateCartProduct({ product, quantity });
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteCartProduct(req, res) {
		const { product } = req.body;
		try {
			const record = await cartModel.deleteCartProduct({ product });
			res.status(200).json({
				status: "ok",
				message: `product ${record.name} that was in row ${record.row} was removed from cart`,
			});
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
