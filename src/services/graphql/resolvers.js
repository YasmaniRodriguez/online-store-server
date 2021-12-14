const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

const resolvers = {
	//Query:
	getProducts({ filters }) {
		return dataHandler.getProducts(filters);
	},
	//Mutation:
	addProducts({ input }) {
		return dataHandler.addProducts(input);
	},
};

module.exports = resolvers;
