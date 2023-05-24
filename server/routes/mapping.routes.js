const mapping = require("../controllers/mapping.controller.js");
var express = require('express');
var router = express.Router();

router.get("/:empID", mapping.getProjects);

router.post("/", mapping.create);

router.post("/:empID", mapping.registerMultipleProjects)

module.exports = router;
