const products = require("../../modules/products/data");

const resolvers = {
	//Query:
	getProducts({ filters }) {
		return products.getProducts(filters);
	},
	//Mutation:
	addProducts({ input }) {
		return products.addProducts(input);
	},
};

module.exports = resolvers;
