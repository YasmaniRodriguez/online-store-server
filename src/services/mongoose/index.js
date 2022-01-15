const mongoose = require("mongoose");
//mongoose.set("debug", true);
const logger = require("../log4js");
const products = require("./models/products");
const orders = require("./models/orders");
const messages = require("./models/messages");
const profiles = require("./models/profiles");
const config = require("../../config");
const { Order, OrderRow } = require("../../utils/class");

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
	///////////////////////////////
	async getProfiles(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await profiles.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await profiles.find(filters, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addProfiles(profile) {
		try {
			const newProfile = new profiles(profile);
			const document = await newProfile.save().then(async (result) => {
				await result.newAuthToken();
				await result.emptyCart();
				return result;
			});

			return document;
		} catch (error) {
			return error;
		}
	}

	async addProfileToken(filters, token) {
		try {
			await profiles.updateOne(filters, {
				$push: { tokens: token },
			});
			const data = await profiles.find(filters, { __v: 0 }).lean();
			const last = data[0].tokens[data[0].tokens.length - 1];
			return last;
		} catch (error) {
			return error;
		}
	}

	async deleteProfileToken(filters, token) {
		try {
			await profiles.updateOne(filters, {
				$pull: {
					tokens: {
						token: token,
					},
				},
			});
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
		const data = [];
		try {
			if (profile) {
				const obj = await profiles.findOneAndDelete({ _id: profile }, {});
				data.push(obj);
				return data;
			} else {
				for await (const doc of profiles.find([{ $sort: { _id: 1 } }])) {
					const obj = await profiles.findOneAndDelete({ _id: doc._id }, {});
					data.push(obj);
				}
				return data;
			}
		} catch (error) {
			return error;
		}
	}
	///////////////////////////////
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
		} catch (error) {
			return error;
		}
	}
	///////////////////////////////
	async getOrders(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await orders.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await orders.find(filters, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async addOrders(order) {
		const { buyer, cart } = order;

		const rows = [];

		for await (const row of cart) {
			let product = await products.find({ code: row.product }, { __v: 0 });
			rows.push(new OrderRow(rows.length + 1, product[0], row.quantity, null));
		}

		try {
			const myOrder = new Order(buyer, rows, null, null);
			const newOrder = new orders(myOrder);
			const document = await newOrder.save();
			return document;
		} catch (error) {
			return error;
		}
	}

	async updateOrders(order = null, fields) {
		const data = [];
		try {
			if (order) {
				const obj = await orders.findOneAndUpdate(
					{ _id: { $eq: order } },
					{ $set: fields },
					{ new: true }
				);
				data.push(obj);
				return data;
			} else {
				for await (const doc of orders.find([{ $sort: { _id: 1 } }])) {
					const obj = await orders.findOneAndUpdate(
						{ _id: doc._id },
						{ $set: fields },
						{ new: true }
					);
					data.push(obj);
				}
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async deleteOrders(order = null) {
		const data = [];
		try {
			if (order) {
				const obj = await orders.findOneAndDelete({ _id: order }, {});
				data.push(obj);
				return data;
			} else {
				for await (const doc of orders.find([{ $sort: { _id: 1 } }])) {
					const obj = await orders.findOneAndDelete({ _id: doc._id }, {});
					data.push(obj);
				}
				return data;
			}
		} catch (error) {
			return error;
		}
	}
	///////////////////////////////
	async getMessages(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await messages.find({}, { __v: 0 }).lean();
				return data;
			} else {
				let message = [];
				let author = [];

				for (let property in filters) {
					if (property === "_id") {
						message.push({ _id: filters[property] });
					} else {
						author.push({ "author.email": filters[property] });
					}
				}

				const data = await messages
					.find({ ...message[0], ...author[0] }, { __v: 0 })
					.lean();
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
		const data = [];
		try {
			if (message) {
				const obj = await messages.findOneAndUpdate(
					{ _id: { $eq: message } },
					{ $set: fields },
					{ new: true }
				);
				data.push(obj);
				return data;
			} else {
				for await (const doc of messages.find([{ $sort: { _id: 1 } }])) {
					const obj = await messages.findOneAndUpdate(
						{ _id: doc._id },
						{ $set: fields },
						{ new: true }
					);
					data.push(obj);
				}
				return data;
			}
		} catch (error) {
			return error;
		}
	}

	async deleteMessages(message = null) {
		const data = [];
		try {
			if (message) {
				const obj = await messages.findOneAndDelete({ _id: message }, {});
				data.push(obj);
				return data;
			} else {
				for await (const doc of messages.find([{ $sort: { _id: 1 } }])) {
					const obj = await messages.findOneAndDelete({ _id: doc._id }, {});
					data.push(obj);
				}
				return data;
			}
		} catch (error) {
			return error;
		}
	}
	////////////////////////////
	async getCarts(filters) {
		const { buyer } = filters;
		try {
			return await profiles
				.findById(buyer, async function (err, result) {
					if (err) {
						return err;
					} else {
						return result.cart;
					}
				})
				.clone()
				.catch(function (err) {
					return err;
				});
		} catch (error) {
			return error;
		}
	}

	async addCartProducts(fields) {
		const { buyer, product, quantity } = fields;
		const data = await products
			.findOne(
				{ code: product },
				{ __v: 0, _id: 0, createdAt: 0, updatedAt: 0 }
			)
			.lean();

		const preventDuplicate = (result) => {
			return new Promise(function (resolve, reject) {
				const row = result.cart.products.find(
					(obj) => obj.product.code === product
				);
				if (row === undefined) {
					result.cart.products.push({ product: data, quantity: quantity });
					result.markModified("cart.products");
					resolve(
						result.save(function (err, res) {
							if (err) {
								return err;
							} else {
								return res.cart;
							}
						})
					);
				} else {
					reject();
				}
			});
		};

		try {
			return await profiles
				.findById(buyer, async function (err, result) {
					if (err) {
						return err;
					} else {
						preventDuplicate(result)
							.then((data) => {
								return data;
							})
							.catch((error) => {
								throw new Error("this product is in the cart");
							});
					}
				})
				.clone()
				.catch(function (err) {
					return err;
				});
		} catch (error) {
			return error;
		}
	}

	async updateCartProducts(fields) {
		const { buyer, product, quantity } = fields;
		try {
			const preview = await profiles
				.findById(buyer, async function (err, result) {
					if (err) {
						return err;
					} else {
						const row = await result.cart.products.find(
							(obj) => obj.product.code === product
						);
						result.cart.products.id(row._id).quantity = quantity;
						result.markModified("cart.products");
						await result.save(function (err, result) {
							if (err) {
								return err;
							} else {
								return result;
							}
						});
					}
				})
				.clone()
				.catch(function (err) {
					return err;
				});
			return preview;
		} catch (error) {
			return error;
		}
	}

	async deleteCartProducts(fields) {
		const { buyer, product } = fields;

		try {
			const preview = await profiles
				.findById(buyer, async function (err, result) {
					const row = await result.cart.products.find(
						(obj) => obj.product.code === product
					);

					if (err) {
						return err;
					} else {
						result.cart.products.id(row._id).remove();
						result.markModified("cart.products");
						await result.save(function (err, result) {
							if (err) {
								return err;
							} else {
								return result;
							}
						});
					}
				})
				.clone()
				.catch(function (err) {
					return err;
				});
			return preview;
		} catch (error) {
			return error;
		}
	}
}

module.exports = mongo;
