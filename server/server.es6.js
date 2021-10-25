const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, { cors: { origin: "*" } });
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const signup = require("./routes/signup.js");
const signin = require("./routes/signin");
const signout = require("./routes/signout");
const products = require("./routes/products.js");
const carts = require("./routes/carts.js");
const orders = require("./routes/orders.js");
const messages = require("./routes/messages.js");
const conf = require("./config.js");
const dataHandlerFile = require("./functions.js").getDataHandlerFile();
const DAO = require(dataHandlerFile);
const dataHandler = new DAO();

dataHandler.buildSchema();

app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);
app.set("dataHandler", dataHandler);

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
require("./middlewares/auth/passport-local-strategy.js");
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.use(signup);
app.use(signin);
app.use(signout);
app.use(products);
app.use(carts);
app.use(orders);
app.use(messages);

server
	.listen(app.get("port"), () => {
		console.log(
			`magic is happening in http://localhost:${app.get(
				"port"
			)} and the data persistance mode is ${
				process.env.DATA_PERSISTENCE_MODE || conf.DATA_PERSISTENCE_MODE
			}. to change persistance mode, you can start server with command: DATA_PERSISTANCE_MODE=MyPersistanceMode npm start. MyPersistanceMode can be: 1 [MongoDB], 2 [MySQL], 3 [SQLite3] or 4 [FileSystem]`
		);
	})
	.on("err", (err) =>
		console.log(`something is preventing us grow , more detail in: ${err}`)
	);
