const profileModel = require("./model");
const { buildHash } = require("../../utils/function");

module.exports = {
	async getProfiles(req, res) {
		const filters = { _id: req.user._id };
		try {
			const profiles = await profileModel.getProfiles(filters);
			profiles.length === 0
				? res
						.status(202)
						.json({ status: "error", message: "this profile does not exist" })
				: res.status(200).json(profiles);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async addProfiles(req, res) {
		const { email, password, confirm } = req.body;

		if (!email) {
			return res
				.status(417)
				.json({ status: "error", message: "you must enter an email address" });
		}

		if (!password) {
			return res
				.status(417)
				.json({ status: "error", message: "you must enter a password" });
		}

		if (password !== confirm) {
			return res
				.status(417)
				.json({ status: "error", message: "passwords are not the same" });
		}

		const exists = await profileModel.getProfiles({ email });
		console.log(exists);
		if (exists.length !== 0) {
			return res.status(417).json({
				status: "error",
				message: "that email address is already in use",
			});
		}

		const encryptedPassword = buildHash(req.body.password);

		const profile = {
			name: req.body.name,
			lastname: req.body.lastname,
			birthday: req.body.birthday,
			avatar: `/images/${req.file.filename}`,
			phone: req.body.phone,
			email: req.body.email,
			address: req.body.address,
			password: encryptedPassword,
			role: req.body.role,
			tyc: req.body.tyc,
		};

		try {
			const record = await profileModel.addProfiles(profile);
			res.status(201).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async updateProfiles(req, res) {
		const profile = req.user._id;
		const fields = req.body;
		const avatar = req.file ? `/images/${req.file.filename}` : req.file;
		try {
			const record = await profileModel.updateProfiles(profile, {
				...fields,
				avatar,
			});
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async deleteProfiles(req, res) {
		const profile = req.user._id;
		try {
			const record = await profileModel.deleteProfiles(profile);
			res.status(200).json(record);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},
};
