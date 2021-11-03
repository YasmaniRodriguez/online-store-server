const express = require("express");
const router = express.Router();
const { fork } = require("child_process");

router.get("/randoms", (req, res) => {
	let qty = req.query.qty;
	const computo = fork("server/randomNumbers.js");
	computo.send(qty);
	computo.on("message", (obj) => {
		res.end(obj);
	});
});

module.exports = router;
