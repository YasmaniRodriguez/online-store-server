const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const { checkSignup } = require("../../middlewares");

router.post("/signup", checkSignup, controller.Signup);
router.post("/signin/:id", controller.Signin);
router.get("/signout", controller.Signout);

module.exports = router;
