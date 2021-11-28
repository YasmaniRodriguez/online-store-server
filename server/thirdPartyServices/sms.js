const twilio = require("twilio");
const conf = require("../config.js");

const client = twilio(
	process.env.SMS_SERVICE_TWILIO_SID || conf.SMS_SERVICE_TWILIO_SID,
	process.env.SMS_SERVICE_TWILIO_TOKEN || conf.SMS_SERVICE_TWILIO_TOKEN
);

class sms {
	constructor() {}

	async SendMessage(sender, receiver, message) {
		return client.messages
			.create({
				body: message,
				from: sender,
				to: receiver,
			})
			.then((sms) => console.log(sms.sid))
			.catch(console.log);
	}
}

module.exports = sms;
