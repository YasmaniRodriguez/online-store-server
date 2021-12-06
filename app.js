const express = require("express");

const compression = require("compression");

const path = require("path");

const mongoose = require("mongoose");

const app = express();

const http = require("http");

const server = http.createServer(app);

const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

const morgan = require("morgan");

const logger = require("./services/log4js");

const cors = require("cors");

const cookieParse = require("cookie-parser");

const session = require("express-session");

const mongoStore = require("connect-mongo");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    const myself = req.session.passport.user._id;
    const uniqueSuffix = `${myself}-${Date.now()}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const routes = require("./routes");

const {
  checkAuthentication,
  checkAuthorities
} = require("./middlewares");

const conf = require("./config");

app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);
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

require("./services/passport")(app);

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
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
app.use(routes);
app.use(checkAuthentication); /////////////////////////////////////////////////////////

io.on("connection", socket => {
  let connection_identifier = socket.id;
  socket.emit("connection", connection_identifier);
}); /////////////////////////////////////////////////////////

server.listen(app.get("port"), async () => {
  logger.info(`magic is happening in ${process.env.BASE_URL || "http://localhost:"}:${app.get("port")} - PID WORKER ${process.pid}`);

  try {
    await mongoose.connect(conf.MONGO_DATA_LOCAL_URI, conf.MONGO_DATA_LOCAL_OPTIONS);
    logger.info("congrats, we are connected to mongo");
  } catch (error) {
    logger.info("sorry, we can't connect to mongo");
    logger.error(`sorry, we can't connect to mongo, more detail in: ${error}`);
  }
}).on("error", error => {
  logger.error(`something is preventing us grow , more detail in: ${error}`);
});
