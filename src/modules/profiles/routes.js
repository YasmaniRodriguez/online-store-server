const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/profiles", controller.getProfiles);
router.post("/profiles", controller.addProfiles);
router.put("/profiles/:id", controller.updateProfiles);
router.delete("/profiles/:id", controller.deleteProfiles);

module.exports = router;
