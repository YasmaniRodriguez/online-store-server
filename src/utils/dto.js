const config = require("../config");
const { buildDeliverable } = require("./function");
const normalize = require("../services/normalizr").getNormalizedData;
const messages = require("../services/normalizr/schemas/messages");

module.exports = {
	async getDeliverable(model, payload) {
		const data = [];
		switch (model) {
			case "profiles":
				if (Array.isArray(payload)) {
					payload.forEach((object) => {
						data.push({
							name: object.name,
							lastname: object.lastname,
							birthday: object.birthday,
							avatar: object.avatar,
							phone: object.phone,
							email: object.email,
							address: object.address,
							tokens: object.tokens,
							cart: object.cart,
						});
					});
				} else {
					data.push({
						name: payload.name,
						lastname: payload.lastname,
						birthday: payload.birthday,
						avatar: payload.avatar,
						phone: payload.phone,
						email: payload.email,
						address: payload.address,
						tokens: payload.tokens,
						cart: payload.cart,
					});
				}
				return buildDeliverable(data);
			case "messages":
				//config.NORMALIZATION ? normalize(data, messages) : data;
				break;
			case "products":
				if (Array.isArray(payload)) {
					payload.forEach((object) => {
						data.push({
							code: object.code,
							category: object.category,
							name: object.name,
							description: object.description,
							image: object.image,
							price: object.price,
							stock: object.stock,
						});
					});
				} else {
					data.push({
						code: payload.code,
						category: payload.category,
						name: payload.name,
						description: payload.description,
						image: payload.image,
						price: payload.price,
						stock: payload.stock,
					});
				}
				return buildDeliverable(data);
			case "carts":
				if (Array.isArray(payload)) {
					payload.forEach((object) => {
						data.push(object);
					});
				} else {
					data.push(payload);
				}
				return buildDeliverable(data);
			case "orders":
				if (Array.isArray(payload)) {
					payload.forEach((object) => {
						data.push(object);
					});
				} else {
					data.push(payload);
				}
				return buildDeliverable(data);
			default:
				break;
		}
	},
};
