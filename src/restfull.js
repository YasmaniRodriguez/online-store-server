const express = require("express");
const router = express.Router();
const gateway = require("./modules/gateway/routes.js");
const products = require("./modules/products/routes.js");
const orders = require("./modules/orders/routes.js");
const messages = require("./modules/messages/routes.js");
const profiles = require("./modules/profiles/routes.js");
const { checkAuthentication } = require("./middlewares");

router.use(checkAuthentication, gateway);
router.use(checkAuthentication, profiles);
router.use(checkAuthentication, products);
router.use(checkAuthentication, orders);
router.use(checkAuthentication, messages);

module.exports = router;
