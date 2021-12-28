const config = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const dataHandler = require("../../utils/function").getDataHandler();
const { deliverableObject } = require("../../utils/dto");

module.exports = {
	async getProfiles(filters) {
		const profiles = await dataHandler.getProfiles(filters);
		return deliverableObject("profiles", profiles);
	},

	async addProfiles(profile) {
		try {
			const profiles = await dataHandler.addProfiles(profile);

			if (profiles._id) {
				await email.SendMessage(
					"ethereal",
					config.ETHEREAL_USER,
					config.ETHEREAL_USER,
					"signup",
					`new signup`
				);
			}

			return deliverableObject("profiles", profiles);
		} catch (error) {
			logger.error(error);
		}
	},

	async updateProfiles(profile, fields) {
		const profiles = await dataHandler.updateProfiles(profile, fields);
		return deliverableObject("profiles", profiles);
	},

	async deleteProfiles(profile) {
		return dataHandler.deleteProfiles(profile);
	},
};
