const orders = require("../../services/mongoose/models/orders");

module.exports = {
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
	},

	async addOrders(order) {
		try {
			const newOrder = new orders(order);
			await newOrder.save();
		} catch (error) {
			return error;
		}
	},

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
	},

	async deleteOrders(order = null) {
		try {
			return !order
				? await orders.deleteMany({})
				: orders.deleteOne({ code: { $eq: order } });
		} catch (error) {
			return error;
		}
	},
};
