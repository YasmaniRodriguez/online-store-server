const config = require("../../config");
const service = require("../../services/nodemailer");
const logger = require("../../services/log4js");
const email = new service();
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();
const DTO = require("../../utils/dto");

module.exports = {
	async getProfiles(filters) {
		const profiles = await dataHandler.getProfiles(filters);
		return DTO.profileDeliverableObject(profiles);
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

			return DTO.profileDeliverableObject(profiles);
		} catch (error) {
			logger.error(error);
		}
	},

	async updateProfiles(profile, fields) {
		const profiles = await dataHandler.updateProfiles(profile, fields);
		return DTO.profileDeliverableObject(profiles);
	},

	async deleteProfiles(profile) {
		return dataHandler.deleteProfiles(profile);
	},
};
