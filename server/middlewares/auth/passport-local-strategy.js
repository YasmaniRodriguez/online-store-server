const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../db/MongoDB/models/users.js");
const { compareHash } = require("../../functions.js");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
