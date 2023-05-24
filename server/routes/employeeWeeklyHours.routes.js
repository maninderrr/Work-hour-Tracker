const employee = require("../controllers/weeklyEmployeeHours.controller.js");
var express = require('express');
var router = express.Router();

router.post("/", employee.create);

// router.get("/:id", employee.findOne);

router.get("/getByProjectAndWeek/:empID/:projectID/:weekEndDate", employee.findOne);

router.get("/getByWeek/:empID/:weekEndDate", employee.findAllHours);

router.get("/:empID", employee.findAllProjectHours);

router.get("/getByProject/:empID/:projectID", employee.findAllHoursForOneProject);

// router.put("/:id", employee.update);

// router.delete("/:id", employee.delete);

module.exports = router;