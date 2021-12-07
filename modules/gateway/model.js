const gatewayData = require("./data");
const conf = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const moment = require("moment");

module.exports = {
	async registerUser(profile) {
		try {
			const userWasCreated = await gatewayData.registerUser(profile);
			return userWasCreated
				? (await email.SendMessage(
						"ethereal",
						conf.ETHEREAL_OPTIONS.auth.user,
						conf.ETHEREAL_OPTIONS.auth.user,
						"signup",
						`new signup`
				  ),
				  true)
				: false;
		} catch (error) {
			logger.error(error);
		}
	},

	async getUsers(filters) {
		try {
			const user = await gatewayData.getUsers(filters);
			return user.length === 0 ? false : true;
		} catch (error) {
			logger.error(error);
		}
	},

	async loginUser(session) {
		try {
			await email.SendMessage(
				"ethereal",
				conf.ETHEREAL_OPTIONS.auth.user,
				conf.ETHEREAL_OPTIONS.auth.user,
				"signin",
				`signin ${session.id} ${moment().format()}`
			);
			await email.SendMessage(
				"gmail",
				conf.GMAIL_OPTIONS.auth.user,
				session.email,
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
				`signout ${ssid} ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},
};
