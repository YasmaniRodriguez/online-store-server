const passport = require("passport");

const settings = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	require("./local.js")(app);
	require("./jwt.js")(app);
	require("./google.js")(app);
};

module.exports = settings;
