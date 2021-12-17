const express = require("express");
const compression = require("compression");
const path = require("path");
const config = require("./config");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, { cors: { origin: "*" } });
const restfull = require("./restfull");
const graphql = require("./graphql");
const morgan = require("morgan");
const logger = require("./services/log4js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: path.join(__dirname, "public/images"),
	filename: (req, file, cb) => {
		const myself = req.sessionID;
		const uniqueSuffix = `${myself}-${Date.now()}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});
const session_options = {
	secret: config.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: { maxAge: 600000 },
};
const { getDataHandler } = require("./utils/function");
const dataHandler = getDataHandler();

app.set("socketio", io);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		...session_options,
		store: mongoStore.create({
			mongoUrl: config.SESSION_URI,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 600,
		}),
	})
);
require("./services/passport")(app);
app.use(cors({ origin: "*", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
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
app.use("/v1", restfull);
app.use("/v2", graphql);

app.get("/", (req, res) => {
	res.status(200).sendFile("index.html", { root: __dirname + "/public" });
});

/////////////////////////////////////////////////////////

io.on("connection", (socket) => {
	let connection_identifier = socket.id;
	socket.emit("connection", connection_identifier);
});

/////////////////////////////////////////////////////////
process.once("SIGUSR2", function () {
	logger.info(`restarting nodemon ⇨ process ${process.pid} will be closed`);
	process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
	logger.info("shutting down the server ⇨ all node process will be closed");
	process.exit(0);
});

server
	.listen(config.PORT, async () => {
		await dataHandler.Builder();
		logger.info(
			`server is running in http://${config.HOST}:${config.PORT} - pid worker: ${process.pid}`
		);
	})
	.on("error", (error) => {
		logger.error(`something is preventing us grow: ${error.message}`);
	});
/////////////////////////////////////////////////////////
