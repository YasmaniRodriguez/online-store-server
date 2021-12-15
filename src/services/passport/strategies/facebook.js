const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../../mongoose/models/profiles");
const config = require("../../../config");

const facebook = (app) => {
	passport.use(
		new facebookStrategy(
			{
				clientID: config.FACEBOOK_CLIENT_ID,
				clientSecret: config.FACEBOOK_CLIENT_SECRET,
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
