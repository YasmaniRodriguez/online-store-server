const { getDataHandler } = require("../../utils/function");
const dataHandler = getDataHandler();

module.exports = {
	async getProfiles(filters) {
		return dataHandler.getProfiles(filters);
	},

	async addProfiles(profile) {
		return dataHandler.addProfiles(profile);
	},

	async updateProfiles(record, fields) {
		return dataHandler.updateProfiles(record, fields);
	},

	async deleteProfiles(profile) {
		return dataHandler.deleteProfiles(profile);
	},
};
