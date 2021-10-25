const conf = require("./config.js");
const bcrypt = require("bcrypt");

function getDataHandlerFile() {
	switch (process.env.DATA_PERSISTENCE_MODE || conf.DATA_PERSISTENCE_MODE) {
		case 1:
			return "./db/MongoDB/MongoDB.js";
			break;
		case 2:
			return "./db/MySQL/MySQL.js";
			break;
		case 3:
			return "./db/SQLite/SQLite3.js";
			break;
		case 4:
			return "./db/FileSystem/FileSystem.js";
			break;
		default:
			console.log("persistence mode was not defined");
			break;
	}
}

function getAuthMethodFile() {
	switch (process.env.AUTH_MODE || conf.AUTH_MODE) {
		case 1:
			return "./auth/JWT/JSONWebToken.js";
			break;
		case 2:
			return "./auth/Passport/Passport.js";
			break;
		default:
			console.log("authentication mode was not defined");
			break;
	}
}

function generateHash(value) {
	return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
}

function compareHash(value1, value2) {
	return bcrypt.compareSync(value1, value2);
}

module.exports = {
	getDataHandlerFile,
	getAuthMethodFile,
	generateHash,
	compareHash,
};
