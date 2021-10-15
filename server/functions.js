const env = require("./env.js");

function getDataHandlerFile() {
	switch (process.env.DATA_PERSISTENCE_MODE || env.DATA_PERSISTENCE_MODE) {
		case 1:
			return "./database/MongoDB/MongoDB.js";
			break;
		case 2:
			return "./database/MySQL/MySQL.js";
			break;
		case 3:
			return "./database/SQLite/SQLite3.js";
			break;
		case 4:
			return "./database/FileSystem/FileSystem.js";
			break;
		default:
			console.log("persistence mode was not selected");
			break;
	}
}

module.exports = { getDataHandlerFile };
