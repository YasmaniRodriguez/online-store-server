const conf = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const moment = require("moment");
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async userRegister(profile) {
		try {
			const userWasCreated = await dataHandler.addProfiles(profile);
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

	async findUsers(filters) {
		try {
			const user = await dataHandler.getProfiles(filters);
			return user.length === 0 ? false : true;
		} catch (error) {
			logger.error(error);
		}
	},

	async userLogin(session) {
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

	async userLogout(session) {
		try {
			await email.SendMessage(
				"ethereal",
				conf.ETHEREAL_OPTIONS.auth.user,
				conf.ETHEREAL_OPTIONS.auth.user,
				"signout",
				`signout ${session.id} ${moment().format()}`
			);
			return true;
		} catch (error) {
			logger.error(error);
		}
	},
};
