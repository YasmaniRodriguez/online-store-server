const profileModel = require("./model");
const { buildHash } = require("../../utils/function");
const validator = require("validator");

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
		const {
			name,
			lastname,
			birthday,
			phone,
			email,
			address,
			password,
			confirm,
			role,
			tyc,
		} = req.body;

		const avatar = req.file.filename;

		if (!validator.isEmail(email)) {
			return res.status(417).json({
				status: "error",
				message: "you must enter an valid email address",
			});
		}

		if (!validator.isMobilePhone(phone, ["es-AR"])) {
			return res.status(417).json({
				status: "error",
				message: "you must enter an valid phone number from AR",
			});
		}

		if (!validator.isDate(birthday)) {
			return res.status(417).json({
				status: "error",
				message: "you must enter an valid birthday format yyyy/mm/dd",
			});
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

		if (exists.data.length !== 0) {
			return res.status(417).json({
				status: "error",
				message: "that email address is already in use",
			});
		}

		const encryptedPassword = buildHash(password);

		const profile = {
			name: name,
			lastname: lastname,
			birthday: birthday,
			avatar: `/images/${avatar}`,
			phone: phone,
			email: email,
			address: address,
			password: encryptedPassword,
			role: role,
			tyc: tyc,
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
