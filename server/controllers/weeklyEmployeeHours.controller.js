var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}
const WeeklyEmployeeHours = db.weeklyEmployeeHours;
const EmployeeProjectMapping = db.employeeProjectMapping;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.weekEndDate || !req.body.empID || !req.body.projectID || !req.body.mondayTime || !req.body.tuesdayTime || !req.body.fridayTime || !req.body.thursdayTime || !req.body.wednesdayTime)  {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Employee
    const weeklyEmployeeHours = {
      employeeId: parseInt(req.body.empID),
      projectId: parseInt(req.body.projectID),
      mondayTime: parseFloat(req.body.mondayTime),
      tuesdayTime: parseFloat(req.body.tuesdayTime),
      fridayTime: parseFloat(req.body.fridayTime),
      thursdayTime: parseFloat(req.body.thursdayTime),
      wednesdayTime: parseFloat(req.body.wednesdayTime),
      weekEndDate: req.body.weekEndDate,
      totalWeekHours: parseFloat(req.body.mondayTime) + parseFloat(req.body.tuesdayTime) + parseFloat(req.body.fridayTime) + parseFloat(req.body.thursdayTime) + parseFloat(req.body.wednesdayTime)
    };
  
      var existingId=null;
      var condition_weekly_hours = {weekEndDate: req.body.weekEndDate , employeeId: parseInt(req.body.empID) , projectId: parseInt(req.body.projectID)}; 
      var condition_emp_project_mapping = {employeeId: parseInt(req.body.empID) , projectId: parseInt(req.body.projectID)}; 

      // function formatDate(userDate) {
      //   // format from M/D/YYYY to YYYYMMDD
      //   return (new Date(userDate).toJSON().slice(0,10).split('-').reverse().join('-'));
      // }
      
      // console.log(formatDate("2017-06-10T16:08:00"));
      WeeklyEmployeeHours.findAll({ where: condition_weekly_hours })
        .then(data => {
          if(data==null || !data.length)
          {
            console.log("New work haur entry\n");
            WeeklyEmployeeHours.create(weeklyEmployeeHours)
            .then(data => {
               res.send(data);
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the weekly hours entry."
              }); 
            });
          }
          else{
            WeeklyEmployeeHours.update(weeklyEmployeeHours, {
              where: { id: data[0].id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "entry was updated successfully."
                  });
                } else {
                  res.send({
                    message: `Cannot update entry with id=${id}. Maybe entry was not found or req.body is empty!`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error updating entry with id=" + id
                });
              });
          }
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving data."
          });
        });
  
   };

   exports.findOne = (req, res) => {
    const empID = req.params.empID;
    const projectID = req.params.projectID;
    const weekEndDate = req.params.weekEndDate;
    var condition_weekly_hours = {weekEndDate: weekEndDate, employeeId: empID, projectId: projectID}
    WeeklyEmployeeHours.findAll({ where: condition_weekly_hours })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });
  };

  exports.findAllHours = (req, res) => {
    const empID = req.params.empID;
    const weekEndDate = req.params.weekEndDate;
    var condition_weekly_hours = {weekEndDate: weekEndDate, employeeId: empID}
    WeeklyEmployeeHours.findAll({ where: condition_weekly_hours })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });
  }; 

  exports.findAllProjectHours = (req, res) => {
    const empID = req.params.empID;
    var condition_weekly_hours = {employeeId: empID}
    WeeklyEmployeeHours.findAll({ where: condition_weekly_hours })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });
  }; 

  exports.findAllHoursForOneProject = (req, res) => {
    const empID = req.params.empID;
    const projectID = req.params.projectID;
    var condition_weekly_hours = {employeeId: empID, projectId: projectID}
    WeeklyEmployeeHours.findAll({ where: condition_weekly_hours })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });
  }; 