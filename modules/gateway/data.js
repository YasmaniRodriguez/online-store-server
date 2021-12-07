const profiles = require("../../services/mongodb/models/profiles");

module.exports = {
	async registerUser(profile) {
		try {
			const newProfile = new profiles(profile);
			await newProfile.save();
			return true;
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
