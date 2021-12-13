const profileData = require("./data");

module.exports = {
	async getProfiles(filters) {
		return profileData.getProfiles(filters);
	},

	async addProfiles(profile) {
		return profileData.addProfiles(profile);
	},

	async updateProfiles(record, fields) {
		return profileData.updateProfiles(record, fields);
	},

	async deleteProfiles(profile) {
		return profileData.deleteProfiles(profile);
	},
};
