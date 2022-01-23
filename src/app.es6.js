const express = require("express");
const compression = require("compression");
const path = require("path");
const config = require("./config");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, { cors: { origin: "*" } });
const restfull = require("./routers/restfull");
const graphql = require("./routers/graphql");
const views = require("./routers/views");
const morgan = require("morgan");
const logger = require("./services/log4js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const session_options = {
	secret: config.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: { maxAge: 600000 },
};
const dataHandler = require("./utils/function").getDataHandler();

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
app.use("/api", restfull);
app.use("/gql", graphql);
app.use(views);

////////TEMPLATE ENGINE////////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));
////////SOCKET/////////////////
// io.on("connection", (socket) => {
// 	let connection_identifier = socket.id;
// 	socket.emit("connection", connection_identifier);
// });

io.on("connection", (socket) => {
	let connection_identifier = socket.id;

	socket.emit("connection", connection_identifier);

	const data = dataHandler.getMessages({});
	console.log(data);
	data
		.then((rows) => io.emit("messages", rows))
		.catch((err) => {
			throw new Error(err);
		});

	socket.on("addMessage", (message) => {
		dataHandler.addMessage(message);

		dataHandler
			.getMessages({})
			.then((rows) => io.emit("messages", rows))
			.catch((err) => {
				throw new Error(err);
			});
	});
});
////////PROCESS////////////////
process.once("SIGUSR2", function () {
	logger.info(`restarting nodemon ⇨ process ${process.pid} will be closed`);
	process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
	logger.info("shutting down the server ⇨ all node process will be closed");
	process.exit(0);
});
////////SERVER////////////////
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
