var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}

const Employee = db.employee;
const Register = db.register;
const bcrypt = require('bcrypt');


exports.login_emp = (req, res) => {

    if (!req.body.email || !req.body.password)  {
      res.status(400).send({
        message: "Email / Password : Content can not be empty!"
      });
      return;
    }
  
    var condition = { email: req.body.email};

    Register.findAll({ where: condition})
      .then(data => {
        console.log(" looking for email in register db");
        if (bcrypt.compareSync(req.body.password,data[0].password)) {
          Employee.findAll({ where: condition})
          .then(dataEmployee => {
            if(dataEmployee[0].managerID!=null){
              res.status(200).send({
                message: "Successfull Combination!",
                isManager: false,
                empID: dataEmployee[0].id
              });
            }
            else {
              res.status(200).send({
                message: "Successfull Combination!",
                isManager: true,
                empID: dataEmployee[0].id
              });
            }
          })

        }
        else {
          res.status(401).send({
            message: "Incorrect Email / Password Combination!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Projects."
        });
      });



};