const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../data/mongodb/models/users.js");
const { compareHash } = require("../../functions.js");

const local = (app) => {
	passport.use(
		new localStrategy(
			{ usernameField: "email", passwordField: "password" },
			async (email, password, done) => {
				try {
					const user = await User.findOne({ email: email });
					if (user && compareHash(password, user.password)) {
						done(null, user);
					} else {
						done(null, false);
					}
				} catch (err) {
					done(err);
				}
			}
		)
	);
};

module.exports = local;
