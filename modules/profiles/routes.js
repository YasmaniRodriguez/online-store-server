const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/profiles", controller.readProfiles);
router.post("/profiles", controller.createProfiles);
router.put("/profiles", controller.updateProfiles);
router.delete("/profiles", controller.deleteProfiles);

module.exports = router;
