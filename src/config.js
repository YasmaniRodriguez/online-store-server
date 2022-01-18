const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	PERSISTENCE: process.env.PERSISTENCE,
	NORMALIZATION: process.env.NORMALIZATION,
	ETHEREAL_HOST: process.env.ETHEREAL_HOST,
	ETHEREAL_PORT: process.env.ETHEREAL_PORT,
	ETHEREAL_USER: process.env.ETHEREAL_USER,
	ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
	GMAIL_USER: process.env.GMAIL_USER,
	GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
	SESSION_SECRET: process.env.SESSION_SECRET,
	SESSION_URI: process.env.SESSION_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	MONGO_URI: process.env.MONGO_URI,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	TWILIO_ACCOUNT_NUMBER: process.env.TWILIO_ACCOUNT_NUMBER,
	TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER,
	ADMIN_PHONE_NUMBER: process.env.ADMIN_PHONE_NUMBER,
};
