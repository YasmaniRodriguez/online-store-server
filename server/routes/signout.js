const express = require("express");
const router = express.Router();

router.get("/signout", (req, res) => {
	req.logOut();
	res.status(200).json({ message: "logout success!" });
});

module.exports = router;
