const config = require("../config");
const logger = require("../services/log4js");
const mongo = require("../services/mongoose");
const mysql = require("../services/knex").mysql;

class DataHandler {
	static instance;

	constructor() {
		if (!DataHandler.instance) {
			switch (config.PERSISTENCE) {
				case "mongo":
					this.handler = new mongo();
					DataHandler.instance = this;
					break;
				case "mysql":
					this.handler = new mysql();
					DataHandler.instance = this;
					break;
				default:
					logger.info("persistence mode was not defined");
					break;
			}
		} else {
			return DataHandler.instance;
		}
	}
	getHandler() {
		return this.handler;
	}
}

module.exports = DataHandler;
