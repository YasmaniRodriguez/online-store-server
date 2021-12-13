const gatewayModel = require("./model");
const { buildHash } = require("../../utils/function");
const logger = require("../../services/log4js");
const passport = require("passport");

module.exports = {
	async userRegister(req, res, next) {
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

		const userExists = await gatewayModel.findUsers({ email });

		if (userExists) {
			return res.status(417).json({
				status: "error",
				message: "that email address is already in use",
			});
		}

		const encryptedPassword = buildHash(req.body.password);

		const profile = {
			name: req.body.name,
			gender: req.body.gender,
			phone: req.body.phone,
			address: req.body.address,
			birthday: req.body.birthday,
			avatar: `/images/${req.file.filename}`,
			email: req.body.email,
			password: encryptedPassword,
			role: req.body.role,
			tyc: req.body.tyc,
		};

		try {
			const register = await gatewayModel.userRegister(profile);
			register
				? res.status(201).json({ status: "ok", message: "user uploaded" })
				: res
						.status(202)
						.json({ status: "error", message: "something is wrong" });
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
		}
	},

	async userLogin(req, res, next) {
		try {
			passport.authenticate("local", (error, user, info) => {
				if (error) {
					logger.error(error);
					throw error;
				}

				if (!user) {
					res
						.status(417)
						.json({ status: "error", message: "wrong user or password" });
				} else {
					req.logIn(user, (error) => {
						if (error) {
							logger.error(error);
							throw error;
						} else {
							gatewayModel.userLogin({
								id: req.sessionID,
								email: user.email,
							});
							res.status(200).json({
								status: "ok",
								message: "successfully authenticated user",
							});
						}
					});
				}
			})(req, res, next);
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
			logger.error(error);
		}
	},

	async userLogout(req, res, next) {
		try {
			const user = req.user;
			if (user) {
				req.logOut(); //req.session.destroy();
				await gatewayModel.userLogout({
					id: req.sessionID,
					imail: req.user,
				});
				res.status(200).json({ status: "ok", message: "logout success!" });
			} else {
				res.status(401).json({ error: "access denied" });
			}
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
			logger.error(error);
		}
	},
};
