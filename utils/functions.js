const conf = require("../config");
const bcrypt = require("bcrypt");
const logger = require("../services/log4js");

function getDataHandlerFile() {
	switch (process.env.DATA_PERSISTENCE_MODE || conf.DATA_PERSISTENCE_MODE) {
		case 1:
			return "./data/mongodb/mongoose.js";
			break;
		default:
			logger.info("persistence mode was not defined");
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
	generateHash,
	compareHash,
};
