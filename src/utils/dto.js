const moment = require("moment");

module.exports = {
	async products(products) {
		let convention = [];
		if (typeof products === "object") {
			convention.push({
				code: products.code,
				category: products.category,
				name: products.name,
				description: products.description,
				image: products.image,
				price: products.price,
				stock: products.stock,
			});
		} else if (Array.isArray(products)) {
			products.forEach((product) => {
				convention.push({
					code: product.code,
					category: product.category,
					name: product.name,
					description: product.description,
					image: product.image,
					price: product.price,
					stock: product.stock,
				});
			});
		} else {
			return false;
		}
		return {
			timestamp: moment().format(),
			pid: process.pid,
			products: convention,
		};
	},

	async profiles(profiles) {
		let convention = [];
		if (typeof profiles === "object") {
			convention.push({
				name: profiles.name,
				lastname: profiles.lastname,
				birthday: profiles.birthday,
				avatar: profiles.avatar,
				phone: profiles.phone,
				email: profiles.email,
				address: profiles.address,
			});
		} else if (Array.isArray(profiles)) {
			profiles.forEach((profile) => {
				convention.push({
					name: profile.name,
					lastname: profile.lastname,
					birthday: profile.birthday,
					avatar: profile.avatar,
					phone: profile.phone,
					email: profile.email,
					address: profile.address,
				});
			});
		} else {
			return false;
		}
		return {
			timestamp: moment().format(),
			pid: process.pid,
			profiles: convention,
		};
	},
};
