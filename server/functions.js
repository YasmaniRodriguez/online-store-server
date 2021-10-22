const env = require("./env.JS");

function getDataHandlerFile() {
	switch (process.env.DATA_PERSISTENCE_MODE || env.DATA_PERSISTENCE_MODE) {
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
	switch (process.env.AUTH_MODE || env.AUTH_MODE) {
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

module.exports = { getDataHandlerFile, getAuthMethodFile };
