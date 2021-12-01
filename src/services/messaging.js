const nodemailer = require("nodemailer");
const twilio = require("twilio");
const conf = require("../config.js");

const ethereal = nodemailer.createTransport(
	process.env.ETHEREAL_OPTIONS || conf.ETHEREAL_OPTIONS
);

const gmail = nodemailer.createTransport(
	process.env.GMAIL_OPTIONS || conf.GMAIL_OPTIONS
);

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID || conf.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN || conf.TWILIO_AUTH_TOKEN
);

function buildMailHtml(eventType) {
	switch (eventType) {
		case "signin":
			return "<h1>a signin has occurred</h1>";
			break;
		case "signout":
			return "<h1>a signout has occurred</h1>";
			break;
		case "signup":
			return "<h1>a new signup has occurred</h1>";
			break;
		default:
			throw "event type was not defined";
			break;
	}
}

class Email {
	constructor() {}

	async SendMessage(
		provider,
		sender,
		receiver,
		eventType,
		subject,
		attachments = []
	) {
		const message = {
			from: sender,
			to: receiver,
			subject: subject,
			html: buildMailHtml(eventType),
			attachments: attachments,
		};

		return provider === "gmail"
			? gmail.sendMail(message, (err, info) => {
					if (err) {
						console.log(err);
						return err;
					} else {
						console.log(info);
					}
			  })
			: ethereal.sendMail(message, (err, info) => {
					if (err) {
						console.log(err);
						return err;
					} else {
						console.log(info);
					}
			  });
	}
}

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

module.exports = { Email, ShortMessageService, Whatsapp };