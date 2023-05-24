var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}
const EmployeeProjectMapping = db.employeeProjectMapping;
const Projects = db.project

exports.create = (req, res) => {
    const Emp_Project = {
        employeeId: parseInt(req.body.empID),
        projectId: parseInt(req.body.projectID)
      }
      EmployeeProjectMapping.create(Emp_Project)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the mapping."
        });
      });
}

exports.registerMultipleProjects = (req, res) => {
    // Validate request
    if (!req.params.empID )  {
        res.status(400).send({
          message: "empID can not be empty!"
        });
        return;
      }
      for (var i = 0; i < req.body.length; i++) {
        var counter = req.body[i];
        const Emp_Project = {
            employeeId: parseInt(req.params.empID),
            projectId: parseInt(req.body[i].projectID)
          }
          EmployeeProjectMapping.create(Emp_Project)
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the mapping."
            });
          });
    }
    res.send("mappings added");
}

exports.getProjects = (req, res) => {
    // Validate request
    if (!req.params.empID )  {
      res.status(400).send({
        message: "empID can not be empty!"
      });
      return;
    }
  
    var condition_emp_project_mapping = {employeeId: req.params.empID}; 

    EmployeeProjectMapping.findAll({
        include : [
            {
                model : Projects,
                attributes : []
            }
        ],
        attributes : ['project.ProjectName', 
                        'project.Id'
                    ],
        where : condition_emp_project_mapping,
        raw : true
    })
                .then(emp_entry =>{
                    if(emp_entry != null)
                    {
                        console.log("found Projects : " + emp_entry);
                        res.send(emp_entry);
                    }
                    else {
                        console.log("No emp / Project mapping");
                        res.send(emp_entry);
                    }

                })

}
