const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/products", controller.readProducts);
router.post("/products", controller.createProducts);
router.put("/products", controller.updateProducts);
router.delete("/products", controller.deleteProducts);

module.exports = router;
