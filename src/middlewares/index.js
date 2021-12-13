const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ error: "access denied" });
	}
};

const checkAuthorities = (req, res, next) => {};

module.exports = { checkAuthentication, checkAuthorities };
