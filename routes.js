const express = require("express");
const router = express.Router();
const products = require("./modules/products/routes.js");
const orders = require("./modules/orders/routes.js");
const messages = require("./modules/messages/routes.js");
const profiles = require("./modules/profiles/routes.js");

router.use("/products", products);
router.use("/orders", orders);
router.use("/messages", messages);
router.use("/profiles", profiles);

module.exports = router;
