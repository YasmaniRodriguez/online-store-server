"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var compression = require("compression");

var path = require("path");

var config = require("./config");

var app = express();

var http = require("http");

var server = http.createServer(app);

var socketio = require("socket.io");

var io = socketio(server, {
  cors: {
    origin: "*"
  }
});

var restfull = require("./routers/restfull");

var graphql = require("./routers/graphql");

var views = require("./routers/views");

var morgan = require("morgan");

var logger = require("./services/log4js");

var cors = require("cors");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var mongoStore = require("connect-mongo");

var session_options = {
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000
  }
};

var dataHandler = require("./utils/function").getDataHandler();

app.set("socketio", io);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session(_objectSpread(_objectSpread({}, session_options), {}, {
  store: mongoStore.create({
    mongoUrl: config.SESSION_URI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 600
  })
})));

require("./services/passport")(app);

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use("/api", restfull);
app.use("/gql", graphql);
app.use(views); ////////TEMPLATE ENGINE////////

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages")); ////////SOCKET/////////////////

io.on("connection", function (socket) {
  var connection_identifier = socket.id;
  socket.emit("connection", connection_identifier);
}); ////////PROCESS////////////////

process.once("SIGUSR2", function () {
  logger.info("restarting nodemon \u21E8 process ".concat(process.pid, " will be closed"));
  process.kill(process.pid, "SIGUSR2");
});
process.on("SIGINT", function () {
  logger.info("shutting down the server ⇨ all node process will be closed");
  process.exit(0);
}); ////////SERVER////////////////

server.listen(config.PORT, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return dataHandler.Builder();

        case 2:
          logger.info("server is running in http://".concat(config.HOST, ":").concat(config.PORT, " - pid worker: ").concat(process.pid));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))).on("error", function (error) {
  logger.error("something is preventing us grow: ".concat(error.message));
});
