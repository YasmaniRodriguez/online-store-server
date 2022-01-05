const config = require("../../../config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET,
	passReqToCallback: false,
};
const User = require("../../mongoose/models/profiles");

const jwt = (app) => {
	passport.use(
		new JwtStrategy(opts, async (payload, done) => {
			try {
				const user = await User.findOne({ _id: payload.sub });
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				return done(error, false);
			}
		})
	);
};

module.exports = jwt;
