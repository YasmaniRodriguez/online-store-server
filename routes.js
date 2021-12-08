const express = require("express");
const router = express.Router();
const products = require("./modules/products/routes.js");
const orders = require("./modules/orders/routes.js");
const carts = require("./modules/carts/routes.js");
const messages = require("./modules/messages/routes.js");
const profiles = require("./modules/profiles/routes.js");
const gateway = require("./modules/gateway/routes.js");
const graphql = require("./services/graphql");
const { checkAuthentication } = require("./middlewares");

router.use(graphql);
router.use(gateway);
router.use(checkAuthentication, products);
router.use(checkAuthentication, carts);
router.use(checkAuthentication, orders);
router.use(checkAuthentication, messages);
router.use(checkAuthentication, profiles);

module.exports = router;
