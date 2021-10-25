const express = require("express");
const router = express.Router();

router.get("/signout", (req, res) => {
	req.logout();
});

// router.get("/signout", (req, res) => {
// 	req.session.destroy((err) => {
// 		!err
// 			? res.status(200).json({ message: "logout success!" })
// 			: res.status(404).json({ error: err });
// 	});
// });

module.exports = router;
