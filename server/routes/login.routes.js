var express = require('express');
var router = express.Router();
const login = require("../controllers/login.controller.js");

router.post("/", login.login_emp);

module.exports = router;
