const config = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const moment = require("moment");

module.exports = {
	async login(session) {
		try {
			await email.SendMessage(
				"ethereal",
				config.ETHEREAL_USER,
				config.ETHEREAL_USER,
				"signin",
				`signin ${session.id} ${moment().format()}`
			);
			await email.SendMessage(
				"gmail",
				config.GMAIL_USER,
				session.email,
				"signin",
				`You have logged in your account at ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},

	async logout(session) {
		try {
			await email.SendMessage(
				"ethereal",
				config.ETHEREAL_USER,
				config.ETHEREAL_USER,
				"signout",
				`signout ${session.id} ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},
};
