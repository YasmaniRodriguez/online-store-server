const nodemailer = require("nodemailer");
const config = require("../../config");
const logger = require("../log4js");

const ethereal_options = {
	host: config.ETHEREAL_HOST,
	port: config.ETHEREAL_PORT,
	auth: {
		user: config.ETHEREAL_USER,
		pass: config.ETHEREAL_PASSWORD,
	},
};

const gmail_options = {
	service: "gmail",
	auth: {
		user: config.GMAIL_USER,
		pass: config.GMAIL_PASSWORD,
	},
};

const ethereal = nodemailer.createTransport(ethereal_options);

const gmail = nodemailer.createTransport(gmail_options);

async function buildMailHtml(eventType, body) {
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
			return `</div><h1>your new order was sent to the supplier</h1>${buildOrderHtml(
				body
			)}</div>`;
			break;
		default:
			throw "event type was not defined";
			break;
	}
}

function buildOrderHtml(order) {
	const { _id, totalAmount, totalQuantity, status } = order;

	return `
	<div class="order">
		<div class="header">
			<div style="display: flex">
				<p>Track Code:</p>
				<p>${_id.toString()}</p>
			</div>
			<div style="display: flex">
				<p>Status:</p>
				<p>${status}</p>
			</div>			
		</div>
		<div class="resume">
			<div style="display: flex">
				<p>Total Amount: </p>
				<p>${totalAmount}</p>
			</div>
			<div style="display: flex">
				<p>Total Quantity: </p>
				<p>${totalQuantity}</p>
			</div>
		</div>
	</div>
	`;
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
			html: await buildMailHtml(eventType, body),
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
