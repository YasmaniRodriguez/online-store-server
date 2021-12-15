const moment = require("moment");

module.exports = {
	async products(products) {
		let convention = [];

		await products.forEach((product) => {
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

		return {
			timestamp: moment().format(),
			pid: process.pid,
			products: convention,
		};
	},

	async profiles(profiles) {
		let convention = [];

		await profiles.forEach((profile) => {
			convention.push({
				name: profile.name,
				lastname: profile.lastname,
				birthday: profile.birthday,
				avatar: profile.avatar,
				phone: profile.phone,
				email: profile.email,
				address: profile.address,
				password: profile.password,
				role: profile.role,
				tyc: profile.tyc,
			});
		});

		return {
			timestamp: moment().format(),
			pid: process.pid,
			profiles: convention,
		};
	},
};
