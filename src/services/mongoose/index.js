const mongoose = require("mongoose");
const logger = require("../log4js");
const products = require("./models/products");
const orders = require("./models/orders");
const messages = require("./models/messages");
const profiles = require("./models/profiles");
const conf = require("../../config");

class mongo {
	constructor() {
		try {
			mongoose.connect(
				conf.MONGO_DATA_LOCAL_URI,
				conf.MONGO_DATA_LOCAL_OPTIONS
			);
			logger.info("we are connected to mongo");
		} catch (error) {
			logger.error(`we can't connect to mongo, more detail in: ${error}`);
		}
	}

	async Builder() {
		logger.info("fantastic, everything is ready");
	}
}

module.exports = mongo;
