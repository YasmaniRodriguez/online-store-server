const products = require("../../services/mongodb/models/products");

module.exports = {
	async getProducts(filters = null) {
		try {
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
		} catch (error) {
			return error;
		}
	},

	async addProducts(product) {
		try {
			const newProduct = new products(product);
			await newProduct.save();
		} catch (error) {
			return error;
		}
	},

	async updateProducts(product = null, fields) {
		try {
			return !product
				? await products.updateMany({}, { $set: fields }, { multi: true })
				: await products.updateOne(
						{ code: { $eq: product } },
						{ $set: fields },
						{ multi: true }
				  );
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
