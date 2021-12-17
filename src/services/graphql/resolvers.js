const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();
const DTO = require("../../utils/dto");

const resolvers = {
	//Query:
	getProducts({ filters }) {
		const products = dataHandler.getProducts(filters);
		return products;
		//return DTO.productDeliverableObject(products);
	},
	//Mutation:
	addProducts({ input }) {
		return dataHandler.addProducts(input);
	},

	addProfiles({ input }) {
		return dataHandler.addProfiles(input);
	},
};

module.exports = resolvers;
