const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const conf = require("../../config.js");

const google = (app) => {
	passport.use(
		new googleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID || conf.GOOGLE_CLIENT_ID,
				clientSecret:
					process.env.GOOGLE_CLIENT_SECRET || conf.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:8080/auth/google/callback",
				passReqToCallback: true,
			},
			function (request, accessToken, refreshToken, profile, done) {
				return done(null, profile);
			}
		)
	);
};

module.exports = google;
