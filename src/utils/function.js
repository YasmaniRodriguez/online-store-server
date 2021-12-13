const conf = require("../config");
const bcrypt = require("bcrypt");
const logger = require("../services/log4js");
const faker = require("faker/locale/en");

function getDataHandler() {
	switch (process.env.DATA_PERSISTENCE_MODE || conf.DATA_PERSISTENCE_MODE) {
		case 1:
			return "./services/mongoose";
			break;
		case 2:
			return "./services/knex";
			break;
		default:
			logger.info("persistence mode was not defined");
			break;
	}
}

function buildHash(value) {
	return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
}

function checkHash(value1, value2) {
	return bcrypt.compareSync(value1, value2);
}

function buildProduct() {
	product = {
		code: faker.datatype.uuid(),
		name: faker.commerce.product(),
		description: faker.commerce.productDescription(),
		category: faker.commerce.productName(),
		image: faker.image.food(),
		price: faker.commerce.price(),
		stock: faker.datatype.number(),
	};
	return product;
}

module.exports = {
	getDataHandler,
	buildHash,
	checkHash,
	buildProduct,
};
