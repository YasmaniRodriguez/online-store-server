const jwt = require("jsonwebtoken");
const env = require("../env.js.js");

class Authentication {
	constructor() {}

	async checkAuthentication(req, res, next) {
		const user = req.session.user;
		const password = req.session.password;

		if (!auth) {
			return res.status(401).json({ error: "access denied" });
		} else {
			try {
				const token = auth;
				const verified = jwt.verify(
					token,
					process.env.PRIVATE_KEY || env.PRIVATE_KEY
				);
				req.user = verified;
				next();
			} catch (error) {
				res.status(400).json({ error: "invalid token" });
			}
		}
	}

	async checkAuthorities(req, res, next) {
		const method = req.method;
		const url = req.route.path;
		const role = req.session.role;

		switch (true) {
			//////////////////////////
			case method === "GET" && url === "/products":
				next();
				break;
			case method === "POST" && url === "/products":
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			case method === "PUT" ?? (url === "/products" || url === "/products:id"):
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			case method === "DELETE" ??
				(url === "/products" || url === "/products:id"):
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			//////////////////////////
			case method === "GET" && url === "/messages":
				next();
				break;
			case method === "POST" && url === "/messages":
				next();
				break;
			case method === "PUT" ?? (url === "/messages" || url === "/messages/:id"):
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			case method === "DELETE" ??
				(url === "/messages" || url === "/messages/:id"):
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			//////////////////////////
			case method === "GET" && url === "/orders":
				next();
				break;
			case method === "POST" && url === "/orders":
				next();
				break;
			case method === "PUT" && url === "/orders":
				next();
				break;
			case method === "DELETE" ?? (url === "/orders" || url === "/orders/:id"):
				return role !== "owner"
					? res
							.status(403)
							.json({ error: "user don't have required permissions" })
					: next();
				break;
			//////////////////////////
			default:
				res.status(403).json({
					error: `for convination [method: ${method}, url: ${url}, role: ${role}] there are not defined permissions`,
				});
		}
	}
}

module.exports = Authentication;
