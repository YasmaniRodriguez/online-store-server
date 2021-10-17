const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.status(200).json({ message: "logout success!" });
});

module.exports = router;
