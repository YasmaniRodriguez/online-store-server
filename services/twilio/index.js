const twilio = require("twilio");
const conf = require("../../config");

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID || conf.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN || conf.TWILIO_AUTH_TOKEN
);

class ShortMessageService {
	constructor() {}

	async SendMessage(sender, receiver, message) {
		return client.messages
			.create({
				body: message,
				from: sender,
				to: receiver,
			})
			.then((msg) => console.log(msg.sid))
			.catch(console.log);
	}
}

class Whatsapp {
	constructor() {}

	async SendMessage(sender, receiver, message) {
		return client.messages
			.create({
				from: `whatsapp:${sender}`,
				body: message,
				to: `whatsapp:${receiver}`,
			})
			.then((msg) => console.log(msg.sid))
			.catch(console.log);
	}
}

module.exports = { ShortMessageService, Whatsapp };
