const gatewayModel = require("./model");
const logger = require("../../services/log4js");
const dataHandler = require("../../utils/function").getDataHandler();
const { checkHash, buildJwt } = require("../../utils/function");

module.exports = {
	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await dataHandler.getProfiles({ email });

			const isValid = user.find((u) => {
				return u.email === email && checkHash(password, u.password);
			});

			if (isValid) {
				//const accessToken = buildJwt(user[0]);

				req.logIn(user[0], (error) => {
					if (error) {
						logger.error(error);
						throw error;
					} else {
						gatewayModel.login({
							id: req.sessionID,
							email: user[0].email,
						});
						res.status(200).json({
							status: "ok",
							message: "successfully authenticated",
							user: {
								id: user[0]._id,
								email: user[0].email,
								role: user[0].role,
								tokens: user[0].tokens,
							},
						});
					}
				});
			} else {
				res
					.status(417)
					.json({ status: "error", message: "wrong user or password" });
			}
		} catch (error) {
			res.status(422).json({ status: "error", message: error.message });
			logger.error(error);
		}
	},

	async logout(req, res, next) {
		const user = req.user;
		try {
			if (user) {
				req.logOut(); //req.session.destroy();
				await gatewayModel.logout({
					id: req.sessionID,
					email: req.user,
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
