const fs = require("fs").promises;
const path = require("path");
const logger = require("../services/log4js");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const faker = require("faker/locale/en");
const SingleDataAccessObject = require("./dao");

function getDataHandler() {
	return new SingleDataAccessObject().getHandler();
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

function buildDeliverable(data) {
	const deliverable = {
		timestamp: moment().format(),
		pid: process.pid,
		data: data,
	};
	return deliverable;
}

function buildJwt(user) {
	const payload = {
		sub: user._id,
		iat: Date.now(),
	};

	const expiration = "120m";

	const token = jwt.sign(payload, config.JWT_SECRET, {
		expiresIn: expiration,
	});

	return { token: token, expires: expiration };
}

async function deleteUploads(file) {
	try {
		await fs.unlink(path.join(__dirname, `../public/uploads/${file}`));
		logger.info("file was removed");
	} catch (error) {
		logger.error(error);
	}
}

module.exports = {
	getDataHandler,
	buildHash,
	checkHash,
	buildProduct,
	buildDeliverable,
	buildJwt,
	deleteUploads,
};
