const summary = require("../controllers/summary.controller.js");
var express = require('express');
var router = express.Router();

router.get("/:weekEndDate", summary.summarize);

module.exports = router;
