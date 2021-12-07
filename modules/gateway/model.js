const GatewayData = require("./data");

module.exports = {
	async Signup(profile) {
		return GatewayData.Signup(profile);
	},

	async Signin(credentials) {
		return CartData.Signin(credentials);
	},

	async Signout() {
		return CartData.Signout();
	},
};
