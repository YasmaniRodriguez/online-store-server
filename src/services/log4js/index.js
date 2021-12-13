const log4js = require("log4js");

log4js.configure({
	appenders: {
		loggerConsole: { type: "console" },
		loggerWarnFile: { type: "file", filename: "warn.log" },
		loggerErrorFile: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["loggerConsole"], level: "trace" },
		info: { appenders: ["loggerConsole"], level: "info" },
		warn: { appenders: ["loggerWarnFile"], level: "warn" },
		error: { appenders: ["loggerErrorFile"], level: "error" },
	},
});

const logger = log4js.getLogger("message");

module.exports = logger;
