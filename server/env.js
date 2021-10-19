const PRIVATE_KEY = "miclaveultrasecreta123*";
const SESSION_OPTIONS = {
	secret: "miClaveUltraSecreta456*",
	resave: false,
	saveUninitialized: false,
	cookie: {},
};
const PORT = 8080;
const DATA_PERSISTENCE_MODE = 1;
const MONGO_DATA_LOCAL_OPTIONS = {
	authSource: "admin",
	user: "root",
	pass: "qwerty456",
};
const MONGO_DATA_CLOUD_URI =
	"mongodb+srv://root:masterinc@online-store-server.ocmyz.mongodb.net/ecommerce";
const MONGO_SESSION_CLOUD_URI =
	"mongodb+srv://root:masterinc@online-store-server.ocmyz.mongodb.net/sessions";
const MONGO_DATA_LOCAL_URI = "mongodb://localhost:27017/ecommerce";
const MYSQL_LOCAL_OPTIONS = {
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "12345678",
	database: "ecommerce",
};
const SQLITE_LOCAL_OPTIONS = {
	filename: "dao/SQLite/data/ecommerce.sqlite",
};
const DATA_NORMALIZATION = true;

module.exports = {
	PRIVATE_KEY,
	SESSION_OPTIONS,
	PORT,
	DATA_PERSISTENCE_MODE,
	MONGO_DATA_CLOUD_URI,
	MONGO_DATA_LOCAL_URI,
	MONGO_DATA_LOCAL_OPTIONS,
	MYSQL_LOCAL_OPTIONS,
	SQLITE_LOCAL_OPTIONS,
	DATA_NORMALIZATION,
	MONGO_SESSION_CLOUD_URI,
};
