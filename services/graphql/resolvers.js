const products = require("../../modules/products/data");
const orders = require("../../modules/orders/data");
const carts = require("../../modules/carts/data");

const resolvers = {
	//Query:
	getProducts(args) {
		return products.getProducts(args.filters);
	},
	getCarts: carts.getCarts,
	getOrders: orders.getOrders,
	//Mutation:
	addProducts: products.addProducts,
	addCartProduct: carts.addCartProduct,
	addOrders: orders.addOrders,
};

module.exports = resolvers;
