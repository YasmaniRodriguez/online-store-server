const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const { uploads } = require("../../middlewares");

router.get("/profiles", controller.getProfiles);
router.post("/profiles", uploads, controller.addProfiles);
router.put("/profiles", uploads, controller.updateProfiles);
router.delete("/profiles", controller.deleteProfiles);

module.exports = router;
