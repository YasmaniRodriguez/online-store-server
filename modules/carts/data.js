const template = require("../../utils/classes");
const moment = require("moment");

const cart = [];

module.exports = {
	async getCarts(filters) {
		const { ouid, buyer } = filters;
		const preview = [];
		try {
			preview.push(new template.Order(ouid, 0, buyer, cart, null, null));
			return preview;
		} catch (error) {
			return error;
		}
	},

	async addCartProduct(cartProduct) {
		try {
		} catch (error) {
			return error;
		}
	},

	async updateCartProduct(cartProduct = null, fields) {
		try {
		} catch (error) {
			return error;
		}
	},

	async deleteCartProduct(cartProduct = null) {
		try {
		} catch (error) {
			return error;
		}
	},
};
