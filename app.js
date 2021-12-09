"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var compression = require("compression");

var path = require("path");

var mongoose = require("mongoose");

var app = express();

var http = require("http");

var server = http.createServer(app);

var socketio = require("socket.io");

var io = socketio(server, {
  cors: {
    origin: "*"
  }
});

var morgan = require("morgan");

var logger = require("./services/log4js");

var cors = require("cors");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var mongoStore = require("connect-mongo");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: function filename(req, file, cb) {
    var myself = req.sessionID;
    var uniqueSuffix = "".concat(myself, "-").concat(Date.now());
    cb(null, "".concat(uniqueSuffix).concat(path.extname(file.originalname)));
  }
});

var routes = require("./routes");

var conf = require("./config");

app.set("port", process.env.PORT || conf.PORT);
app.set("socketio", io);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session(_objectSpread(_objectSpread({}, conf.SESSION_OPTIONS), {}, {
  store: mongoStore.create({
    mongoUrl: conf.MONGO_SESSION_CLOUD_URI,
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
app.use(multer({
  storage: storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = ["jpeg", "jpg", "png", "gif"];
    var validFileType = filetypes.some(function (type) {
      return file.mimetype.includes(type);
    });

    if (validFileType) {
      cb(null, true);
    } else {
      cb("ERROR: invalid image extension");
    }
  }
}).single("image"));
app.use(routes);
app.get("/", function (req, res) {
  res.status(200).sendFile("index.html", {
    root: __dirname + "/public"
  });
}); /////////////////////////////////////////////////////////

io.on("connection", function (socket) {
  var connection_identifier = socket.id;
  socket.emit("connection", connection_identifier);
}); /////////////////////////////////////////////////////////

server.listen(app.get("port"), /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          logger.info("magic is happening in ".concat(process.env.BASE_URL || "http://localhost", ":").concat(app.get("port"), " - PID WORKER ").concat(process.pid));
          _context.prev = 1;
          _context.next = 4;
          return mongoose.connect(conf.MONGO_DATA_LOCAL_URI, conf.MONGO_DATA_LOCAL_OPTIONS);

        case 4:
          logger.info("congrats, we are connected to mongo");
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          logger.info("sorry, we can't connect to mongo");
          logger.error("sorry, we can't connect to mongo, more detail in: ".concat(_context.t0));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 7]]);
}))).on("error", function (error) {
  logger.error("something is preventing us grow , more detail in: ".concat(error));
});
