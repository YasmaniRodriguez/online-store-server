const config = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const data = require("../../utils/function").getDataHandler();
const deliverable = require("../../utils/dto").getDeliverable;

module.exports = {
	async getProfiles(filters) {
		const result = await data.getProfiles(filters);
		return deliverable("profiles", result);
	},

	async addProfiles(profile) {
		try {
			const result = await data.addProfiles(profile);

			if (result._id) {
				await email.SendMessage(
					"ethereal",
					config.ETHEREAL_USER,
					config.ETHEREAL_USER,
					"signup",
					`new signup`
				);
			}

			return deliverable("profiles", result);
		} catch (error) {
			logger.error(error);
		}
	},

	async updateProfiles(profile, fields) {
		const result = await data.updateProfiles(profile, fields);
		return deliverable("profiles", result);
	},

	async deleteProfiles(profile) {
		const result = await data.deleteProfiles(profile);
		return deliverable("profiles", result);
	},
};
