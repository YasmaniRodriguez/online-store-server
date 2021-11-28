const nodemailer = require("nodemailer");
const conf = require("../config.js");

const ethereal = nodemailer.createTransport(
	process.env.MAIL_SERVICE_ETHEREAL_OPTIONS ||
		conf.MAIL_SERVICE_ETHEREAL_OPTIONS
);

const gmail = nodemailer.createTransport(
	process.env.MAIL_SERVICE_GMAIL_OPTIONS || conf.MAIL_SERVICE_GMAIL_OPTIONS
);

function buildMailHtml(eventType) {
	switch (eventType) {
		case "login":
			return "<h1>a login has occurred</h1>";
			break;
		case "logout":
			return "<h1>a logout has occurred</h1>";
			break;
		default:
			throw "event type was not defined";
			break;
	}
}

class email {
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

module.exports = email;
