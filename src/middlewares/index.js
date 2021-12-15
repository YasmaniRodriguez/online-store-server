const checkAuthentication = (req, res, next) => {
	const { method, url } = req;
	if (method === "POST" && url === "/profiles") {
		return next();
	} else if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ error: "access denied" });
	}
};

const checkAuthorities = (req, res, next) => {};

module.exports = { checkAuthentication, checkAuthorities };
