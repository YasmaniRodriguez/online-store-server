const profileModel = require("./model");

module.exports = {
	async getProfiles(req, res) {
		const filters = { _id: req.user._id };
		try {
			const profiles = await profileModel.getProfiles(filters);
			profiles.length === 0
				? res
						.status(202)
						.json({ status: "error", message: "this profile does not exist" })
				: res.status(200).json({ profiles });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addProfiles(req, res) {
		const profile = req.body;
		try {
			await profileModel.addProfiles(profile);
			res.status(201).json({ status: "ok", message: "profile uploaded" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateProfiles(req, res) {
		const record = req.params.id;
		const fields = req.body;
		const avatar = req.file ? `/images/${req.file.filename}` : req.file;
		try {
			await profileModel.updateProfiles(record, { ...fields, avatar });
			res.status(200).json({ status: "ok", message: "profile updated" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteProfiles(req, res) {
		try {
			res.status(200).json({ status: "ok", message: "profile removed" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
