const profileModel = require("./model");

module.exports = {
	async getProfiles(req, res) {
		const filters = req.query;
		try {
			const profiles = await profileModel.getProfiles(filters);
			profiles.length === 0
				? res.json({ status: "error", message: "this profile does not exist" })
				: res.json({ profiles });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async addProfiles(req, res) {
		const profile = req.body;
		try {
			await profileModel.addProfiles(profile);
			res.json({ status: "ok", message: "profile uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async updateProfiles(req, res) {
		const record = req.params.id;
		const fields = req.body;
		const avatar = req.file ? `/images/${req.file.filename}` : req.file;
		try {
			await profileModel.updateProfiles(record, { ...fields, avatar });
			res.json({ status: "ok", message: "profile updated" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async deleteProfiles(req, res) {
		try {
			res.json({ status: "ok", message: "profile removed" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},
};
