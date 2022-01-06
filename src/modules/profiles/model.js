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
			const user = await dataHandler.addProfiles(profile);

			if (user._id) {
				await user.newAuthToken();

				await email.SendMessage(
					"ethereal",
					config.ETHEREAL_USER,
					config.ETHEREAL_USER,
					"signup",
					`new signup`
				);
			}

			const profiles = await dataHandler.getProfiles({ _id: user._id });

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
		const profiles = await dataHandler.deleteProfiles(profile);
		return deliverableObject("profiles", profiles);
	},
};
