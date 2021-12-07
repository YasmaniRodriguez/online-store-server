const gatewayData = require("./data");
const conf = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const moment = require("moment");

module.exports = {
	async registerUser(profile) {
		try {
			await gatewayData.registerUser(profile);
			await email.SendMessage(
				"ethereal",
				conf.ETHEREAL_OPTIONS.auth.user,
				conf.ETHEREAL_OPTIONS.auth.user,
				"signup",
				`new signup`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},

	async getUsers(filters) {
		try {
			const user = await gatewayData.getUsers(filters);
			return user;
		} catch (error) {
			logger.error(error);
		}
	},

	async loginUser() {
		try {
			await email.SendMessage(
				"ethereal",
				conf.ETHEREAL_OPTIONS.auth.user,
				conf.ETHEREAL_OPTIONS.auth.user,
				"signin",
				`signin ${req.sessionID} ${moment().format()}`
			);
			await email.SendMessage(
				"gmail",
				conf.GMAIL_OPTIONS.auth.user,
				user.email,
				"signin",
				`You have logged in your account at ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},

	async logoutUser() {
		try {
			await email.SendMessage(
				"ethereal",
				conf.ETHEREAL_OPTIONS.auth.user,
				conf.ETHEREAL_OPTIONS.auth.user,
				"signout",
				`signout ${req.sessionID} ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},
};
