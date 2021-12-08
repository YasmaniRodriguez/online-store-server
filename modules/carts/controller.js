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

			console.log(carts);
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
