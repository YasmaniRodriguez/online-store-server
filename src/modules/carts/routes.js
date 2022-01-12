const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

//router.get("/carts", controller.getCarts);
//router.post("/carts", controller.addCartProducts);
//router.put("/carts/:id", controller.updateCartProducts);
//router.delete("/carts/:id", controller.deleteCartProducts);
router.post("/carts", controller.addProductToCart);
router.put("/carts/:id", controller.updateProductToCart);
router.delete("/carts/:id", controller.deleteProductToCart);

module.exports = router;
