const ProfileData = require("./data");
const conf = require("../../config");

module.exports = {
	async getProfiles(filters) {
		return ProfileData.getProfiles(filters);
	},

	async addProfiles(profile) {
		return ProfileData.addProfiles(profile);
	},

	async updateProfiles(record, fields) {
		return ProfileData.updateProfiles(record, fields);
	},

	async deleteProfiles(profile) {
		return ProfileData.deleteProfiles(profile);
	},
};
