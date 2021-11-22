const conf = require("../../config.js");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.PRIVATE_KEY || conf.PRIVATE_KEY,
};
const User = require("../../db/MongoDB/models/users");

const jwt = (app) => {
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			User.findOne({ id: jwt_payload.sub }, function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			});
		})
	);
};

module.exports = jwt;
