const mongoose = require("mongoose");
const logger = require("../log4js");
const products = require("./models/products");
const orders = require("./models/orders");
const messages = require("./models/messages");
const profiles = require("./models/profiles");
const config = require("../../config");

const options = {
	authSource: config.MONGO_LOCAL_AUTH_SOURCE,
	user: config.MONGO_LOCAL_USER,
	pass: config.MONGO_LOCAL_PASSWORD,
};

class mongo {
	constructor() {
		try {
			mongoose.connect(config.MONGO_LOCAL_URI, options);
			logger.info("we are connected to mongo");
		} catch (error) {
			logger.error(
				`we can't connect to mongo, more detail in: ${error.message}`
			);
		}
	}

	async Builder() {
		logger.info("fantastic, everything is ready");
	}

	async getProfiles(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await profiles.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await profiles.find({ filters }, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addProfiles(profile) {
		try {
			const newProfile = new profiles(profile);
			const document = await newProfile.save();
			return document;
		} catch (error) {
			return error;
		}
	}

	async updateProfiles(profile = null, fields) {
		try {
			if (profile) {
				await profiles.updateOne(
					{ _id: { $eq: profile } },
					{ $set: fields },
					{ multi: true }
				);
				const preview = await profiles
					.find({ _id: profile }, { __v: 0 })
					.lean();
				return preview;
			} else {
				await profiles.updateMany({}, { $set: fields }, { multi: true });
				const preview = await profiles.find({}, { __v: 0 }).lean();
				return preview;
			}
		} catch (error) {
			return error;
		}
	}

	async deleteProfiles(profile = null) {
		try {
			return !profile
				? await profiles.deleteMany({})
				: profiles.findOneAndDelete({ code: { $eq: profile } }, {});
			//: profiles.deleteOne({ email: { $eq: profile } });
		} catch (error) {
			return error;
		}
	}

	async getProducts(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await products.find({}, { __v: 0 }).lean();
				return data;
			} else {
				let match = new Object();
				let range = new Object(); //example: /products?price[gte]=1000&price[lte]=2000

				for (let key in filters) {
					if (typeof filters[key] !== "object") {
						match[key] = filters[key];
					} else if (Object.keys(filters[key]).length === 2) {
						range[key] = {
							$gte: filters[key].gte,
							$lte: filters[key].lte,
						};
					} else {
						const fil = Object.keys(filters[key])[0];
						fil === "lte"
							? (range[key] = { $lte: filters[key].lte })
							: (range[key] = { $gte: filters[key].gte });
					}
				}

				const data = await products
					.find({ ...match, ...range }, { __v: 0 })
					.lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addProducts(product) {
		try {
			const newProduct = new products(product);
			const document = await newProduct.save();
			return document;
		} catch (error) {
			return error;
		}
	}

	async updateProducts(product = null, fields) {
		try {
			if (product) {
				await products.updateOne(
					{ code: { $eq: product } },
					{ $set: fields },
					{ multi: true }
				);
				const preview = await products
					.find({ code: product }, { __v: 0 })
					.lean();
				return preview;
			} else {
				await products.updateMany({}, { $set: fields }, { multi: true });
				const preview = await products.find({}, { __v: 0 }).lean();
				return preview;
			}
		} catch (error) {
			return error;
		}
	}

	async deleteProducts(product = null) {
		try {
			return !product
				? await products.deleteMany({})
				: products.findOneAndDelete({ code: { $eq: product } }, {});
			//: products.deleteOne({ code: { $eq: product } });
		} catch (error) {
			return error;
		}
	}

	async getOrders(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await orders.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await orders.find({ filters }, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addOrders(order) {
		try {
			const newOrder = new orders(order);
			const document = await newOrder.save();
			return document;
		} catch (error) {
			return error;
		}
	}

	async updateOrders(order = null, fields) {
		try {
			return !order
				? await orders.updateMany({}, { $set: fields }, { multi: true })
				: await orders.updateOne(
						{ code: { $eq: order } },
						{ $set: fields },
						{ multi: true }
				  );
		} catch (error) {
			return error;
		}
	}

	async deleteOrders(order = null) {
		try {
			return !order
				? await orders.deleteMany({})
				: orders.findOneAndDelete({ code: { $eq: order } }, {});
			//: orders.deleteOne({ code: { $eq: order } });
		} catch (error) {
			return error;
		}
	}

	async getMessages(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await messages.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await messages.find({ filters }, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addMessages(message) {
		try {
			const newMessage = new messages(message);
			const document = await newMessage.save();
			return document;
		} catch (error) {
			return error;
		}
	}

	async updateMessages(message = null, fields) {
		try {
			return !message
				? await messages.updateMany({}, { $set: fields }, { multi: true })
				: await messages.updateOne(
						{ code: { $eq: message } },
						{ $set: fields },
						{ multi: true }
				  );
		} catch (error) {
			return error;
		}
	}

	async deleteMessages(message = null) {
		try {
			return !message
				? await messages.deleteMany({})
				: messages.findOneAndDelete({ code: { $eq: message } }, {});
			//: messages.deleteOne({ code: { $eq: message } });
		} catch (error) {
			return error;
		}
	}
}

module.exports = mongo;
