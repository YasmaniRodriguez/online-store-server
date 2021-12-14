//const profileData = require("./data");
const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getProfiles(filters) {
		return dataHandler.getProfiles(filters);
		//return profileData.getProfiles(filters);
	},

	async addProfiles(profile) {
		return dataHandler.addProfiles(profile);
		//return profileData.addProfiles(profile);
	},

	async updateProfiles(record, fields) {
		return dataHandler.updateProfiles(record, fields);
		//return profileData.updateProfiles(record, fields);
	},

	async deleteProfiles(profile) {
		return dataHandler.deleteProfiles(profile);
		//return profileData.deleteProfiles(profile);
	},
};
