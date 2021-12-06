const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/products", controller.readProducts);
router.post("/products", controller.createProducts);
router.put("/products/:id", controller.updateProducts);
router.delete("/products/:id", controller.deleteProducts);

module.exports = router;
