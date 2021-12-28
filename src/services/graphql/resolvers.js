const { getDataHandler } = require("../../utils/function");
const { Order, OrderRow } = require("../../utils/class");
const dataHandler = getDataHandler();
const DTO = require("../../utils/dto");

const resolvers = {
	//Queries:
	async getProfiles({ filters }) {
		const records = await dataHandler.getProfiles(filters);
		return records;
	},

	async getMessages({ filters }) {
		const records = await dataHandler.getMessages(filters);
		return records;
	},

	async getProducts({ filters }) {
		const records = await dataHandler.getProducts(filters);
		return records;
	},

	async getOrders({ filters }) {
		const records = await dataHandler.getOrders(filters);
		return records;
	},

	//Mutations:
	async addProfiles({ input }) {
		const records = await dataHandler.addProfiles(input);
		return records;
	},

	async updateProfiles({ profile, fields }) {
		const records = await dataHandler.updateProfiles(profile, fields);
		return records;
	},

	async deleteProfiles({ profile }) {
		const records = await dataHandler.deleteProfiles(profile);
		return records;
	},
	///////////////////////////////
	async addMessages({ message }) {
		const records = await dataHandler.addMessages(message);
		return records;
	},

	async updateMessages({ message, fields }) {
		const records = await dataHandler.updateMessages(message, fields);
		return records;
	},

	async deleteMessages({ message }) {
		const records = await dataHandler.deleteMessages(message);
		return records;
	},
	///////////////////////////////
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
	///////////////////////////////
	async addOrders({ order }) {
		const records = await dataHandler.addOrders(order);
		return records;
	},

	async updateOrders({ order, fields }) {
		const records = await dataHandler.updateCartProducts(order, fields);
		return records;
	},

	async deleteOrders({ order }) {
		const records = await dataHandler.deleteCartProducts(order);
		return records;
	},
	///////////////////////////////
};

module.exports = resolvers;
