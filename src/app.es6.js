const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, { cors: { origin: "*" } });
const routes = require("./routes");
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
const conf = require("./config");

const { getDataHandler } = require("./utils/function");
const dataHandler = getDataHandler();

app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use(routes);

app.get("/", (req, res) => {
	res.status(200).sendFile("index.html", { root: __dirname + "/public" });
});

/////////////////////////////////////////////////////////

io.on("connection", (socket) => {
	let connection_identifier = socket.id;
	socket.emit("connection", connection_identifier);
});

/////////////////////////////////////////////////////////

server
	.listen(app.get("port"), async () => {
		await dataHandler.Builder();
		logger.info(
			`magic is happening in ${
				process.env.BASE_URL || "http://localhost"
			}:${app.get("port")} - PID WORKER ${process.pid}`
		);
	})
	.on("error", (error) => {
		logger.error(`something is preventing us grow , more detail in: ${error}`);
	});
