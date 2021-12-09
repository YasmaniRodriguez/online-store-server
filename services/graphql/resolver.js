const products = require("../../modules/products/data");
const orders = require("../../modules/orders/data");
const messages = require("../../modules/messages/data");
const carts = require("../../modules/carts/data");

const resolver = {
	getMessages: messages.getMessages,
	getProducts(args) {
		return products.getProducts(args.filters);
	},
	getCarts: carts.getCarts,
	getOrders: orders.getOrders,
	////////////////////////////
	addMessages: messages.addMessages,
	addProducts: products.addProducts,
	addCartProduct: carts.addCartProduct,
	addOrders: orders.addOrders,
};

module.exports = resolver;
