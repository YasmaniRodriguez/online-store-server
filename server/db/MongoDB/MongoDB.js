const mongoose = require("mongoose");
const products = require("./models/products");
const orders = require("./models/orders");
const messages = require("./models/messages");
const users = require("./models/users");
const conf = require("../../config.js");

mongoose
	.connect(
		conf.MONGO_DATA_LOCAL_URI,
		conf.MONGO_DATA_LOCAL_OPTIONS || conf.MONGO_DATA_CLOUD_URI
	)
	.then((connection) => {
		console.log("congrats, we are connected to mongo");
	})
	.catch((error) => {
		console.log(error.message);
	});

class mongo {
	constructor() {}

	async buildSchema() {
		console.log("fantastic, everything is ready");
	}

	async addProducts(product) {
		const newProduct = new products(product);
		await newProduct.save();
	}

	async getProducts(filters = null) {
		if (Object.keys(filters).length === 0) {
			const data = await products.find({}, { __v: 0 }).lean();
			return data;
		} else {
			let match = new Object();
			let range = new Object();

			for (let key in filters) {
				typeof filters[key] === "object"
					? (range[key] = { $gte: filters[key].gte, $lte: filters[key].lte })
					: (match[key] = filters[key]);
			}

			const data = await products
				.find({ ...match, ...range }, { __v: 0 })
				.lean();
			return data;
		}
	}

	async updateProducts(product = null, fields) {
		return !product
			? await products.updateMany({}, { $set: fields }, { multi: true })
			: await products.updateOne(
					{ code: { $eq: product } },
					{ $set: fields },
					{ multi: true }
			  );
	}

	async deleteProducts(product = null) {
		return !product
			? await products.deleteMany({})
			: products.deleteOne({ code: { $eq: product } });
	}

	async addMessages(message) {
		const newMessage = new messages(message);
		await newMessage.save();
	}

	async getMessages() {
		const normalize = require("../normalization/handler.js").getNormalizedData;
		const schema = require("../normalization/schemas/messages.js");
		const data = await messages.find({}, { __v: 0 }).lean();

		return conf.DATA_NORMALIZATION ? normalize(data, schema) : data;
	}

	async addOrders(order) {
		const newOrder = new orders(order);
		await newOrder.save();
	}

	async getOrders(order = null) {
		return !order
			? await orders.find({}, { __v: 0 }).lean()
			: orders.findOne({ code: { $eq: order } }).lean();
	}

	async addUsers(user) {
		const newUser = new users(user);
		await newUser.save();
	}

	async getUsers(user = null) {
		return !user
			? await users.find({}, { __v: 0 }).lean()
			: users.findOne({ email: { $eq: user } }).lean();
	}

	async updateUsers(user = null, fields) {
		return !user
			? await users.updateMany({}, { $set: fields }, { multi: true })
			: await users.updateOne(
					{ email: { $eq: user } },
					{ $set: fields },
					{ multi: true }
			  );
	}

	async deleteUsers(user = null) {
		return !user
			? await users.deleteMany({})
			: users.deleteOne({ email: { $eq: user } });
	}
}

module.exports = mongo;
