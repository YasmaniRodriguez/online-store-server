const config = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getProfiles(filters) {
		return dataHandler.getProfiles(filters);
	},

	async addProfiles(profile) {
		try {
			const record = await dataHandler.addProfiles(profile);

			if (record._id) {
				await email.SendMessage(
					"ethereal",
					config.ETHEREAL_USER,
					config.ETHEREAL_USER,
					"signup",
					`new signup`
				);
			}

			return record;
		} catch (error) {
			logger.error(error);
		}
	},

	async updateProfiles(record, fields) {
		return dataHandler.updateProfiles(record, fields);
	},

	async deleteProfiles(profile) {
		return dataHandler.deleteProfiles(profile);
	},
};
