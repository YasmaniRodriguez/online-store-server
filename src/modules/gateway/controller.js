const gatewayModel = require("./model");
const logger = require("../../services/log4js");
const passport = require("passport");

module.exports = {
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
