const products = require("../../modules/products/data");
const orders = require("../../modules/orders/data");
const messages = require("../../modules/messages/data");
const carts = require("../../modules/carts/data");
const profiles = require("../../modules/profiles/data");

const resolver = {
	getProfiles: profiles.getProfiles,
	getMessages: messages.getMessages,
	getProducts: products.getProducts,
	getCarts: carts.getCarts,
	getOrders: orders.getOrders,
};

module.exports = resolver;
