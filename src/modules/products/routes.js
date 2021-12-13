const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/products", controller.getProducts);
router.post("/products", controller.addProducts);
router.put("/products/:id", controller.updateProducts);
router.delete("/products/:id", controller.deleteProducts);

module.exports = router;
