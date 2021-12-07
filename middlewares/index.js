const User = require("../services/mongodb/models/profiles");

const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({ error: "access denied" });
	}
};

const checkAuthorities = (req, res, next) => {};

const checkSignup = async (req, res, next) => {
	const { email, password, confirm } = req.body;

	const userExists = await User.findOne({ email: email });

	if (userExists) {
		return res
			.status(422)
			.json({ error: "that email address is already in use" });
	}

	if (!email) {
		return res.status(422).json({ error: "you must enter an email address" });
	}

	if (!password) {
		return res.status(422).json({ error: "you must enter a password" });
	}

	if (password !== confirm) {
		return res.status(422).json({ error: "passwords are not the same" });
	}

	return next();
};

module.exports = { checkAuthentication, checkAuthorities, checkSignup };
