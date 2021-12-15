const config = require("../../../config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET,
	passReqToCallback: true,
};
const User = require("../../mongoose/models/profiles");

const jwt = (app) => {
	passport.use(
		new JwtStrategy(opts, async (jwtPayload, done) => {
			try {
				const user = await User.findOne({ id: jwtPayload.sub });
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (e) {
				done(e, false);
			}
		})
	);
};

module.exports = jwt;
