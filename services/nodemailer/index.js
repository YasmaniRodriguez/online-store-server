const nodemailer = require("nodemailer");
const conf = require("../../config");
const logger = require("../log4js");

const ethereal = nodemailer.createTransport(
	process.env.ETHEREAL_OPTIONS || conf.ETHEREAL_OPTIONS
);

const gmail = nodemailer.createTransport(
	process.env.GMAIL_OPTIONS || conf.GMAIL_OPTIONS
);

function buildMailHtml(eventType, body) {
	switch (eventType) {
		case "signin":
			return `<div><h1>a signin has occurred</h1>${body}</div>`;
			break;
		case "signout":
			return `<div><h1>a signout has occurred</h1>${body}</div>`;
			break;
		case "signup":
			return `<div><h1>a new signup has occurred</h1>${body}</div>`;
			break;
		case "order":
			return `</div><h1>a new order has occurred</h1>${body}</div>`;
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
		body = "<span></span>",
		attachments = []
	) {
		const message = {
			from: sender,
			to: receiver,
			subject: subject,
			html: buildMailHtml(eventType, body),
			attachments: attachments,
		};

		return provider === "gmail"
			? gmail.sendMail(message, (err, info) => {
					if (err) {
						logger.error(err);
						return err;
					} else {
						logger.info(info);
					}
			  })
			: ethereal.sendMail(message, (err, info) => {
					if (err) {
						logger.error(err);
						return err;
					} else {
						logger.info(info);
					}
			  });
	}
}

module.exports = Email;
