const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/orders", controller.getOrders);
router.post("/orders", controller.addOrders);
router.post("/orders/rows", controller.addOrderRows);
router.put("/orders/:id", controller.updateOrders);
router.delete("/orders/:id", controller.deleteOrders);
router.delete("/orders/rows", controller.deleteOrderRows);

module.exports = router;
