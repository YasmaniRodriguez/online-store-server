const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();
const DTO = require("../../utils/dto");

const resolvers = {
	//Queries:
	async getProducts({ filters }) {
		const records = await dataHandler.getProducts(filters);
		return records;
		//return DTO.productDeliverableObject(products);
	},
	//Mutations:
	async addProducts({ product }) {
		const records = await dataHandler.addProducts(product);
		return records;
	},

	async updateProducts({ product, fields }) {
		const records = await dataHandler.updateProducts(product, fields);
		return records;
	},

	async deleteProducts({ product }) {
		const records = await dataHandler.deleteProducts(product);
		return records;
	},

	async addProfiles({ input }) {
		const records = await dataHandler.addProfiles(input);
		return records;
	},

	async addMessages({ input }) {
		const records = await dataHandler.addMessages(input);
		return records;
	},
};

module.exports = resolvers;
