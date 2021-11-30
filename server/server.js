const express = require("express");

const compression = require("compression");

const path = require("path");

const app = express();

const http = require("http");

const server = http.createServer(app);

const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

const logger = require("morgan");

const log4js = require("log4js");

const cors = require("cors");

const cookieParse = require("cookie-parser");

const session = require("express-session");

const mongoStore = require("connect-mongo");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
  }
});

const signup = require("./routes/signup.js");

const signin = require("./routes/signin");

const signout = require("./routes/signout");

const products = require("./routes/products.js");

const carts = require("./routes/carts.js");

const orders = require("./routes/orders.js");

const messages = require("./routes/messages.js");

const conf = require("./config.js");

const dataHandlerFile = require("./functions.js").getDataHandlerFile();

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      error: "access denied"
    });
  }
}; // const checkAuthorities = authMethod.checkAuthorities;


const DAO = require(dataHandlerFile);

const dataHandler = new DAO();
app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);
app.set("dataHandler", dataHandler);
app.use(multer({
  storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: (req, file, cb) => {
    const filetypes = ["jpeg", "jpg", "png", "gif"];
    const validFileType = filetypes.some(type => file.mimetype.includes(type));

    if (validFileType) {
      cb(null, true);
    } else {
      cb("ERROR: invalid image extension");
    }
  }
}).single("image"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParse());
app.use(session({ ...conf.SESSION_OPTIONS,
  store: mongoStore.create({
    mongoUrl: conf.MONGO_SESSION_CLOUD_URI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 600
  })
}));

require("./auth/passport/handler.js")(app);

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(signup);
app.use(signin);
app.use(signout); //app.use(users);

app.use(checkAuthentication, products);
app.use(checkAuthentication, carts);
app.use(checkAuthentication, orders);
app.use(checkAuthentication, messages);
log4js.configure({
  appenders: {
    miLoggerConsole: {
      type: "console"
    },
    miLoggerFileWarn: {
      type: "file",
      filename: "warn.log"
    },
    miLoggerFileError: {
      type: "file",
      filename: "error.log"
    }
  },
  categories: {
    default: {
      appenders: ["miLoggerConsole"],
      level: "trace"
    },
    info: {
      appenders: ["miLoggerConsole"],
      level: "info"
    },
    warn: {
      appenders: ["miLoggerFileWarn"],
      level: "warn"
    },
    error: {
      appenders: ["miLoggerFileError"],
      level: "error"
    }
  }
});
const loggerInfo = log4js.getLogger("info");
const loggerWarn = log4js.getLogger("warn");
const loggerError = log4js.getLogger("error");
app.set("loggerInfo", loggerInfo);
app.set("loggerWarn", loggerWarn);
app.set("loggerError", loggerError); // app.get("/", (req, res) => {
// 	//res.status(200).sendFile("index.html", { root: __dirname + "/public" });
// });
/////////////////////////////////////////////////////////

io.on("connection", socket => {
  let connection_identifier = socket.id;
  socket.emit("connection", connection_identifier);
}); /////////////////////////////////////////////////////////
// io.on("connect", (socket) => {
// 	const undefinedUser = new classes.Profile(
// 		"Albert",
// 		"Einstein",
// 		"1879-03-14",
// 		null,
// 		"usuario_1@gmail.com",
// 		"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/scientist_einstein_avatar_professor-256.png"
// 	);
// 	console.log(`connection_identifier: ${socket.id}`);
// 	socket.emit("profile", undefinedUser);
// 	dataHandler
// 		.getMessages()
// 		.then((rows) => {
// 			io.emit("messages", rows);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// 	socket.on("new-message", (message) => {
// 		dataHandler.addMessages({ ...message });
// 		dataHandler
// 			.getMessages()
// 			.then((rows) => {
// 				io.emit("messages", rows);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	});
// });
/////////////////////////////////////////////////////////

server.listen(app.get("port"), async () => {
  loggerInfo.info(`magic is happening in http://localhost:${app.get("port")} - PID WORKER ${process.pid}`);

  try {
    await dataHandler.buildSchema(); //loggerInfo.info("DB is ready");
  } catch (error) {
    loggerInfo.info(`sorry, we can't connect to DB, more detail in: ${error}`);
    loggerError.error(`sorry, we can't connect to DB, more detail in: ${error}`);
  }
}).on("err", err => {
  loggerInfo.info(`something is preventing us grow , more detail in: ${err}`);
  loggerError.error(`something is preventing us grow , more detail in: ${err}`);
});
