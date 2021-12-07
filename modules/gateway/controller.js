const GatewayModel = require("./model");
const passport = require("passport");
const { generateHash } = require("../../utils/functions");
const moment = require("moment");
const conf = require("../../config");

module.exports = {
	async Signup(req, res, next) {
		const password = await generateHash(req.body.password);
		const profile = {
			name: req.body.name,
			gender: req.body.gender,
			phone: req.body.phone,
			address: req.body.address,
			birthday: req.body.birthday,
			avatar: `/images/${req.file.filename}`,
			email: req.body.email,
			password: password,
			role: req.body.role,
			tyc: req.body.tyc,
		};
		try {
			await GatewayModel.Signup(profile);
			res.json({ status: "ok", message: "user uploaded" });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	},

	async Signin(req, res, next) {},

	async Signout(req, res, next) {},
};
