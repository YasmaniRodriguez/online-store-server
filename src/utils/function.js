const bcrypt = require("bcrypt");
const faker = require("faker/locale/en");
const SingleDataAccessObject = require("./dao");

const getDataHandler = () => {
	return new SingleDataAccessObject().getHandler();
};

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
