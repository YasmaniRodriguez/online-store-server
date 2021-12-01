const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../../db/MongoDB/models/users");
const conf = require("../../config.js");

const facebook = (app) => {
	passport.use(
		new facebookStrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID || conf.FACEBOOK_CLIENT_ID,
				clientSecret:
					process.env.FACEBOOK_CLIENT_SECRET || conf.FACEBOOK_CLIENT_SECRET,
				callbackURL: "/signin/facebook/callback",
				profileFields: ["email", "name"],
			},
			function (accessToken, refreshToken, profile, done) {
				const { email, first_name, last_name } = profile._json;
				const data = {
					email,
					name: first_name + last_name,
				};
				new User(data).save();
				done(null, profile);
			}
		)
	);
};

module.exports = facebook;
