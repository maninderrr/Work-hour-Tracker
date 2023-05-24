var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}

const Employee = db.employee;
const Register = db.register;
const bcrypt = require('bcrypt');
const saltRounds = 10;


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.register_emp = (req, res) => {

    // console.log(req);
    // Validate request
    if (!req.body.empName || !req.body.email || !req.body.password || !req.body.DOJ )  {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const hashedPassword = bcrypt.hashSync(req.body.password,saltRounds);
    // Create a Employee
    const register = {
      email: req.body.email,
      password: hashedPassword
    };

    var emp = {
      empName: req.body.empName,
      email: req.body.email,
      manager: req.body.manager,
      DOJ: req.body.DOJ
    };
  
    if(req.body.isManager) {
      emp = {
        empName: req.body.empName,
        email: req.body.email,
        manager: req.body.manager,
        DOJ: req.body.DOJ,
        managerID: null  
      }
    }
    else {
      emp = {
        empName: req.body.empName,
        email: req.body.email,
        manager: req.body.manager,
        DOJ: req.body.DOJ,
        managerID: req.body.managerID  
      }
    }
    // Save Employee in the database
    Register.create(register)
      .then(data => {
        console.log("New User Registered")

        // Save Employee in the database
        Employee.create(emp)
          .then(data => {
            console.log("Added to employee db")
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while adding the Employee."
            });
          });

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      });


};