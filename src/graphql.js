const express = require("express");
const router = express.Router();
const graphql = require("./services/graphql");
const { checkAuthentication } = require("./middlewares");

router.use(graphql);

module.exports = router;
