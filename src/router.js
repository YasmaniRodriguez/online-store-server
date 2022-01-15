const express = require("express");
const router = express.Router();
const gateway = require("./modules/gateway/routes.js");
const profiles = require("./modules/profiles/routes.js");
const messages = require("./modules/messages/routes.js");
const products = require("./modules/products/routes.js");
const orders = require("./modules/orders/routes.js");
const carts = require("./modules/carts/routes.js");
const { authentication } = require("./middlewares");

router.use(authentication, gateway);
router.use(authentication, profiles);
router.use(authentication, products);
router.use(authentication, orders);
router.use(authentication, carts);
router.use(authentication, messages);

module.exports = router;
