const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/carts", controller.getCarts);
router.post("/carts", controller.addCartProducts);
router.put("/carts/:id", controller.updateCartProducts);
router.delete("/carts/:id", controller.deleteCartProducts);

module.exports = router;
