const cartModel = require("./model");

module.exports = {
	async getCarts(req, res) {
		const buyer = {
			name: req.user.name,
			phone: req.user.phone,
			email: req.user.email,
			address: req.user.address,
		};
		try {
			const carts = await cartModel.getCarts(buyer);
			carts
				? res.status(200).json(carts)
				: res
						.status(202)
						.json({ status: "error", message: "something is wrong" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
	async addCartProducts(req, res) {
		const { product, quantity } = req.body;
		try {
			const record = await cartModel.addCartProducts({ product, quantity });
			res.status(201).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
	async updateCartProducts(req, res) {
		const product = req.params.id;
		const quantity = req.body.quantity;
		try {
			const record = await cartModel.updateCartProducts({ product, quantity });
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
	async deleteCartProducts(req, res) {
		const product = req.params.id;
		try {
			const record = await cartModel.deleteCartProducts(product);
			res.status(200).json({
				status: "ok",
				message: `product ${record.name} was removed from cart`,
			});
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
	///////////////////////////////
	async addProductToCart(req, res) {
		const { product, quantity } = req.body;
		const buyer = req.user._id.toString();
		try {
			const record = await cartModel.addProductToCart({
				buyer,
				product,
				quantity,
			});
			res.status(201).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
