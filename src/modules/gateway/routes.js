const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.post("/login", controller.userLogin);
router.get("/logout", controller.userLogout);

module.exports = router;
