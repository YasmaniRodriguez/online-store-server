const gatewayModel = require("./model");
const { generateHash } = require("../../utils/functions");
const logger = require("../../services/log4js");
const passport = require("passport");

module.exports = {
	async registerUser(req, res, next) {
		const password = generateHash(req.body.password);
		const profile = {
			name: req.body.name,
			gender: req.body.gender,
			phone: req.body.phone,
			address: req.body.address,
			birthday: req.body.birthday,
			avatar: `/images/${req.file.filename}`,
			email: req.body.email,
			password: password,
			role: req.body.role,
			tyc: req.body.tyc,
		};
		try {
			await gatewayModel.registerUser(profile);
			res.status(200).json({ status: "ok", message: "user uploaded" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async loginUser(req, res, next) {
		const { email, password, confirm } = req.body;

		if (!email) {
			return res
				.status(422)
				.json({ status: "error", message: "you must enter an email address" });
		}

		if (!password) {
			return res
				.status(422)
				.json({ status: "error", message: "you must enter a password" });
		}

		if (password !== confirm) {
			return res
				.status(422)
				.json({ status: "error", message: "passwords are not the same" });
		}

		const userExists = await gatewayModel.getUsers({ email });

		if (userExists) {
			return res.status(422).json({
				status: "error",
				message: "that email address is already in use",
			});
		}

		try {
			passport.authenticate("local", (error, user, info) => {
				if (error) {
					throw error;
					logger.error(error);
				}

				if (!user) {
					res
						.status(401)
						.json({ status: "error", message: "wrong user or password" });
				} else {
					req.logIn(user, (error) => {
						if (error) {
							throw error;
							logger.error(error);
						} else {
							res.status(200).json({
								status: "ok",
								message: "successfully authenticated user",
							});
						}
					});
				}
			})(req, res, next);
			await gatewayModel.loginUser();
		} catch (error) {
			res.json({ status: "error", message: error.message });
			logger.error(error);
		}
	},

	async logoutUser(req, res, next) {
		try {
			await gatewayModel.logoutUser();
			res.status(200).json({ status: "ok", message: "logout success!" });
		} catch (error) {
			res.status(401).json({ status: "error", message: error.message });
			logger.error(error);
		}
	},
};
