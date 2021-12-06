const profiles = require("../../services/mongodb/models/profiles");

module.exports = {
	async getProfiles(filters = null) {
		try {
			return !filters
				? await profiles.find({}, { __v: 0 }).lean()
				: profiles.findOne({ _id: { $eq: filters } }).lean();
		} catch (error) {
			return error;
		}
	},

	async addProfiles(profile) {
		try {
			const newProfile = new profiles(profile);
			await newProfile.save();
		} catch (error) {
			return error;
		}
	},

	async updateProfiles(profile = null, fields) {
		try {
			return !profile
				? await profiles.updateMany({}, { $set: fields }, { multi: true })
				: await profiles.updateOne(
						{ _id: { $eq: profile } },
						{ $set: fields },
						{ multi: true }
				  );
		} catch (error) {
			return error;
		}
	},

	async deleteProfiles(profile = null) {
		try {
			return !profile
				? await profiles.deleteMany({})
				: profiles.deleteOne({ email: { $eq: profile } });
		} catch (error) {
			return error;
		}
	},
};
