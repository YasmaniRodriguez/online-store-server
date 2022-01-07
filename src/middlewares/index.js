const logger = require("../services/log4js");
const passport = require("passport");
const dataHandler = require("../utils/function").getDataHandler();

async function authentication(req, res, next) {
	const { method, url } = req;
	const post = method.includes("POST");
	const profiles = url.includes("/profiles");
	const login = url.includes("/login");
	const bearer = req.headers.authorization;

	if (post && (profiles || login)) {
		return next();
	} else if (bearer) {
		passport.authenticate(
			"jwt",
			{ session: false },
			async (error, verified) => {
				if (error || !verified) {
					res.status(400).json({ error: "invalid token" });
				}
				try {
					const user = await dataHandler.getProfiles({ _id: verified._id });

					if (user[0]) {
						const tokens = user[0].tokens;
						const exist = await tokens.some(
							(t) => t.token === bearer.split(" ")[1]
						);
						exist
							? ((req.user = user[0]), next())
							: res.status(400).json({ error: "expired token" });
					} else {
						res.status(401).json({ error: "access denied" });
					}
				} catch (error) {
					res.status(401).json({ error: "access denied" });
					logger.error(error);
				}
			}
		)(req, res, next);
	} else {
		res.status(401).json({ error: "access denied" });
	}
}

async function authorities(req, res, next) {}

module.exports = { authentication, authorities };
