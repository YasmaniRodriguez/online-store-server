const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/messages", controller.readMessages);
router.post("/messages", controller.createMessages);
router.put("/messages", controller.updateMessages);
router.delete("/messages", controller.deleteMessages);

module.exports = router;
