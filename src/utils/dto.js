const moment = require("moment");

module.exports = {
	async productDeliverableObject(products) {
		function getDeliverable(objects) {
			let convention = [];

			if (Array.isArray(objects)) {
				objects.forEach((object) => {
					convention.push({
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
				convention.push({
					code: products.code,
					category: products.category,
					name: products.name,
					description: products.description,
					image: products.image,
					price: products.price,
					stock: products.stock,
				});
			}

			return convention;
		}

		const deliverableObject = await getDeliverable(products);

		return {
			timestamp: moment().format(),
			pid: process.pid,
			products: deliverableObject,
		};
	},

	async profileDeliverableObject(profiles) {
		function getDeliverable(objects) {
			let convention = [];

			if (Array.isArray(objects)) {
				objects.forEach((object) => {
					convention.push({
						name: object.name,
						lastname: object.lastname,
						birthday: object.birthday,
						avatar: object.avatar,
						phone: object.phone,
						email: object.email,
						address: object.address,
					});
				});
			} else {
				convention.push({
					name: profiles.name,
					lastname: profiles.lastname,
					birthday: profiles.birthday,
					avatar: profiles.avatar,
					phone: profiles.phone,
					email: profiles.email,
					address: profiles.address,
				});
			}

			return convention;
		}

		const deliverableObject = await getDeliverable(profiles);

		return {
			timestamp: moment().format(),
			pid: process.pid,
			profiles: deliverableObject,
		};
	},

	async orderDeliverableObject() {},

	async messageDeliverableObject() {},
};
