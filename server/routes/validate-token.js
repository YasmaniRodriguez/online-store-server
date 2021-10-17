const jwt = require("jsonwebtoken");
const env = require("../env.js");

const verifyToken = (req, res, next) => {
	const auth = req.session.token;
	if (!auth) {
		return res.status(401).json({ error: "access denied" });
	} else {
		try {
			const token = auth;
			const verified = jwt.verify(
				token,
				process.env.PRIVATE_KEY || env.PRIVATE_KEY
			);
			req.user = verified;
			next();
		} catch (error) {
			res.status(400).json({ error: "invalid token" });
		}
	}
};

module.exports = verifyToken;
