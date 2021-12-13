const profiles = require("../../services/mongoose/models/profiles");
const logger = require("../../services/log4js");

module.exports = {
	async addUser(profile) {
		try {
			const newProfile = new profiles(profile);
			const done = await newProfile
				.save()
				.then(() => {
					return true;
				})
				.catch((error) => {
					logger.error(error.message);
					return false;
				});
			return done;
		} catch (error) {
			return error;
		}
	},
	async getUsers(filters = null) {
		try {
			if (Object.keys(filters).length === 0) {
				const data = await profiles.find({}, { __v: 0 }).lean();
				return data;
			} else {
				const data = await profiles.find({ filters }, { __v: 0 }).lean();
				return data;
			}
		} catch (error) {
			return error;
		}
	},
};
