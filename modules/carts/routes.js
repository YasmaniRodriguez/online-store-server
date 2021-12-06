const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/carts", controller.getCarts);
router.post("/carts", controller.addCartProduct);
router.put("/carts/:id", controller.updateCartProduct);
router.delete("/carts/:id", controller.deleteCartProduct);

module.exports = router;
