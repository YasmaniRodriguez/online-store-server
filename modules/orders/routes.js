const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/orders", controller.readOrders);
router.post("/orders", controller.createOrders);
router.put("/orders", controller.updateOrders);
router.delete("/orders", controller.deleteOrders);

module.exports = router;
