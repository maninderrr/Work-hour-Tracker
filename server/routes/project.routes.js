const project = require("../controllers/project.controller.js");
var express = require('express');
var router = express.Router();

router.post("/", project.create);

router.get('/getid/:projectName' , project.getid);

router.get("/:id", project.findOne);

router.get("/", project.findAll);

router.put("/:id", project.update);

router.delete("/:id", project.delete);

module.exports = router;
