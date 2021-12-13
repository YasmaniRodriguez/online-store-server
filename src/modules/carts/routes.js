const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/carts", controller.getCarts);
router.post("/carts", controller.addCartProduct);
router.put("/carts", controller.updateCartProduct);
router.delete("/carts", controller.deleteCartProduct);

module.exports = router;
