var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}

const Employee = db.employee;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.empName || !req.body.email || !req.body.manager || !req.body.DOJ)  {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Employee
    const employee = {
      empName: req.body.empName,
      email: req.body.email,
      manager: req.body.manager,
      DOJ: req.body.DOJ
    };
  
    // Save Employee in the database
    Employee.create(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      });
  };

  exports.findAll = (req, res) => {
    const empName = req.query.empName;
    var condition = empName ? { empName: { [Op.like]: `%${empName}%` } } : null;
  
    Employee.findAll({ where: condition })
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

  exports.findAllByManagerId = (req, res) => {
    const managerID = req.params.managerID;
    var condition = {managerID: managerID};
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Employees."
        });
      });    
  }

exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
      if(!data)
        res.status(403).send({
        message: "Error: no Employee exists for given empId"
       });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

exports.getid = (req, res) => {

  if (!req.params.email)  {
    res.status(400).send({
      message: "email can not be empty!"
    });
    return;
  }

  const email_c = req.params.email;
  console.log(email_c)
  var condition = {email : email_c}
  Employee.findOne(
    {
      attributes : [['id','empid']],
      where : condition, 
      raw:true
    }
    )
    .then(data => {
      if(!data)
        res.status(403).send({
        message: "Error: no Employee exists for given email"
       });
      else{
        console.log(data)
        res.send(data);
      }
        
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving Employee with email=" + email_c
      });
    });
};
