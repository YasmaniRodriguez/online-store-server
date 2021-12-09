const products = require("../../services/mongodb/models/products");

module.exports = {
	async getProducts(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await products.find({}, { __v: 0 }).lean();
				return data;
			} else {
				console.log(filters);
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
	},

	async addProducts(product) {
		try {
			const newProduct = new products(product);
			await newProduct.save();
			const preview = await products
				.find({ code: product.code }, { __v: 0 })
				.lean();
			return preview;
		} catch (error) {
			return error;
		}
	},

	async updateProducts(product = null, fields) {
		try {
			if (product) {
				await products.updateOne(
					{ code: { $eq: product } },
					{ $set: fields },
					{ multi: true }
				);
				const preview = await products
					.find({ code: product.code }, { __v: 0 })
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
	},

	async deleteProducts(product = null) {
		try {
			return !product
				? await products.deleteMany({})
				: products.deleteOne({ code: { $eq: product } });
		} catch (error) {
			return error;
		}
	},
};
