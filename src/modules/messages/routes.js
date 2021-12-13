const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/messages", controller.getMessages);
router.post("/messages", controller.addMessages);
router.put("/messages/:id", controller.updateMessages);
router.delete("/messages/:id", controller.deleteMessages);

module.exports = router;
