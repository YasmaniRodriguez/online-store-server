const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "brisa.fadel76@ethereal.email",
		pass: "GY8SJ61F63CZSU4qjv",
	},
});

const mailOptions = {
	from: "servidor node.js",
	to: "brisa.fadel76@ethereal.email",
	subject: "mail de prueba",
	html: "<h1>Hola</h1>",
};

transporter.sendMail(mailOptions, (err, info) => {
	if (err) {
		console.log(err);
		return err;
	} else {
		console.log(info);
	}
});
