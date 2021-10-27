const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../../db/MongoDB/models/users");

const facebook = (app) => {
	passport.use(
		new facebookStrategy(
			{
				clientID: "672538957001557",
				clientSecret: "6e3c8aca68729c7d1bef57eaaa375d81",
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
