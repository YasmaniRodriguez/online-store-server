const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		!err
			? res.status(200).json({ message: "logout success!" })
			: res.status(404).json({ error: err });
	});
});

module.exports = router;
