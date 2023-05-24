    const employee = require("../controllers/employee.controller.js");
    var express = require('express');
    var router = express.Router();

    router.get('/getid/:email' , employee.getid);
    
    router.post("/", employee.create);

    router.get("/:id", employee.findOne);

    router.get("/", employee.findAll);

    router.get("/getTeam/:managerID", employee.findAllByManagerId);

    router.put("/:id", employee.update);

    router.delete("/:id", employee.delete);

    

    module.exports = router;
