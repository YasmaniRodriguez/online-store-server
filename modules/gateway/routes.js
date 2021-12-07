const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/logout", controller.logoutUser);

module.exports = router;
