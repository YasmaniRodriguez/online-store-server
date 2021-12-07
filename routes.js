const express = require("express");
const router = express.Router();
const products = require("./modules/products/routes.js");
const orders = require("./modules/orders/routes.js");
const messages = require("./modules/messages/routes.js");
const profiles = require("./modules/profiles/routes.js");
const gateway = require("./modules/gateway/routes.js");

router.use(gateway);
router.use(products);
router.use(orders);
router.use(messages);
router.use(profiles);

module.exports = router;
