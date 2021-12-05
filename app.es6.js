const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, { cors: { origin: "*" } });
const logger = require("morgan");
const log4js = require("log4js");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const multer = require("multer");
const routes = require("./routes");
const { checkAuthentication, checkAuthorities } = require("./middleware");

const conf = require("./config.js");
const dataHandlerFile = require("./functions.js").getDataHandlerFile();

const DAO = require(dataHandlerFile);
const dataHandler = new DAO();

app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);
app.set("dataHandler", dataHandler);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use(
	session({
		...conf.SESSION_OPTIONS,
		store: mongoStore.create({
			mongoUrl: conf.MONGO_SESSION_CLOUD_URI,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 600,
		}),
	})
);
require("./auth/passport.js")(app);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

const storage = multer.diskStorage({
	destination: path.join(__dirname, "public/images"),
	filename: (req, file, cb) => {
		const myself = req.session.passport.user._id;
		const uniqueSuffix = `${myself}-${Date.now()}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

app.use(
	multer({
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
	}).single("image")
);

app.use(routes);
app.use(checkAuthentication);

log4js.configure({
	appenders: {
		miLoggerConsole: { type: "console" },
		miLoggerFileWarn: { type: "file", filename: "warn.log" },
		miLoggerFileError: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["miLoggerConsole"], level: "trace" },
		info: { appenders: ["miLoggerConsole"], level: "info" },
		warn: { appenders: ["miLoggerFileWarn"], level: "warn" },
		error: { appenders: ["miLoggerFileError"], level: "error" },
	},
});

const loggerInfo = log4js.getLogger("info");
const loggerWarn = log4js.getLogger("warn");
const loggerError = log4js.getLogger("error");

app.set("loggerInfo", loggerInfo);
app.set("loggerWarn", loggerWarn);
app.set("loggerError", loggerError);

/////////////////////////////////////////////////////////

io.on("connection", (socket) => {
	let connection_identifier = socket.id;
	socket.emit("connection", connection_identifier);
});

/////////////////////////////////////////////////////////

server
	.listen(app.get("port"), async () => {
		loggerInfo.info(
			`magic is happening in http://localhost:${app.get("port")} - PID WORKER ${
				process.pid
			}`
		);
		try {
			await dataHandler.buildSchema();
		} catch (error) {
			loggerInfo.info(
				`sorry, we can't connect to DB, more detail in: ${error}`
			);
			loggerError.error(
				`sorry, we can't connect to DB, more detail in: ${error}`
			);
		}
	})
	.on("err", (err) => {
		loggerInfo.info(`something is preventing us grow , more detail in: ${err}`);
		loggerError.error(
			`something is preventing us grow , more detail in: ${err}`
		);
	});
