const passport = require("passport");

const settings = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	require("./strategies/local.js")(app);
	require("./strategies/jwt.js")(app);
};

module.exports = settings;
