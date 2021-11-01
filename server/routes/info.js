const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
	res.json({
		input_params: process.argv,
		os: process.platform,
		node_version: process.version,
		memory_usage: process.memoryUsage(),
		path_execution: process.execPath,
		process_i: process.pid,
		carpeta: process.cwd(),
	});
});

module.exports = router;
