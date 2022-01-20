const path = require("path");
const logger = require("../services/log4js");
const passport = require("passport");
const dataHandler = require("../utils/function").getDataHandler();
const multer = require("multer");

async function authentication(req, res, next) {
	const { method, url } = req;
	const post = method.includes("POST");
	const profiles = url.includes("/profiles");
	const login = url.includes("/login");
	const bearer = req.headers.authorization;

	if (post && (profiles || login)) {
		return next();
	} else if (bearer) {
		passport.authenticate(
			"jwt",
			{ session: false },
			async (error, verified) => {
				if (error || !verified) {
					res.status(400).json({ error: "invalid token" });
				}
				try {
					const user = await dataHandler.getProfiles({ _id: verified._id });

					if (user[0]) {
						const tokens = user[0].tokens;
						const exist = await tokens.some(
							(t) => t.token === bearer.split(" ")[1]
						);
						exist
							? ((req.user = user[0]), next())
							: res.status(400).json({ error: "expired token" });
					} else {
						res.status(401).json({ error: "access denied" });
					}
				} catch (error) {
					res.status(401).json({ error: "access denied" });
					logger.error(error);
				}
			}
		)(req, res, next);
	} else {
		res.status(401).json({ error: "access denied" });
	}
}

async function authorities(req, res, next) {}

const storage = multer.diskStorage({
	destination: path.join(__dirname, "../public/src/uploads"),
	filename: (req, file, cb) => {
		const myself = req.sessionID;
		const uniqueSuffix = `${myself}-${Date.now()}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const uploads = multer({
	storage,
	limits: { fileSize: 10000000 },
	fileFilter: (req, file, cb) => {
		const filetypes = ["jpeg", "jpg", "png", "gif"];
		const validFileType = filetypes.some((type) =>
			file.mimetype.includes(type)
		);
		if (validFileType) {
			cb(null, true);
		} else {
			cb("ERROR: invalid image extension");
		}
	},
}).single("image");

module.exports = { authentication, authorities, uploads };
