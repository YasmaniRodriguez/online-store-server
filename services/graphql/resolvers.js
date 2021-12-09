const products = require("../../modules/products/data");
const orders = require("../../modules/orders/data");
const carts = require("../../modules/carts/data");

const resolvers = {
	//Query:
	getProducts({ filters }) {
		return products.getProducts(filters);
	},
	getCarts: carts.getCarts,
	getOrders: orders.getOrders,
	//Mutation:
	addProducts({ input }) {
		console.log(input);
		return products.addProducts(input);
	},
	addCartProduct: carts.addCartProduct,
	addOrders: orders.addOrders,
};

module.exports = resolvers;
