const twilio = require("twilio");
const conf = require("../../config");
const logger = require("../log4js");

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
			.then((msg) => logger.info(msg.sid))
			.catch((error) => logger.error(error));
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
			.then((msg) => logger.info(msg.sid))
			.catch((error) => logger.error(error));
	}
}

module.exports = { ShortMessageService, Whatsapp };
