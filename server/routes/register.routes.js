var express = require('express');
var router = express.Router();
const register = require("../controllers/register.controller.js");

router.post("/", register.register_emp);

router.get('/', function(req, res, next) {
    res.send('Please !! NO get request for register ');
  });

module.exports = router;
