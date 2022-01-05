const logger = require("../services/log4js");
const passport = require("passport");
const User = require("../services/mongoose/models/profiles");

const checkAuthentication = (req, res, next) => {
	const { method, url } = req;
	const post = method.includes("POST");
	const profiles = url.includes("/profiles");
	const login = url.includes("/login");
	const BearerToken = req.headers.authorization;

	if (post && (profiles || login)) {
		return next();
	} else if (BearerToken) {
		passport.authenticate("jwt", { session: false }, async (error, token) => {
			if (error || !token) {
				res.status(400).json({ error: "invalid token" });
			}
			try {
				const user = await User.findOne({ _id: token._id });
				user
					? ((req.user = user), next())
					: res.status(401).json({ error: "access denied" });
			} catch (error) {
				res.status(401).json({ error: "access denied" });
				logger.error(error);
			}
		})(req, res, next);
	} else {
		res.status(401).json({ error: "access denied" });
	}
};

const checkAuthorities = (req, res, next) => {};

module.exports = { checkAuthentication, checkAuthorities };
