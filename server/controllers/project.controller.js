var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}
const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.projectName || !req.body.projectLead || !req.body.startDate || !req.body.teamName || !req.body.department)  {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Project
    const project = {
      projectName: req.body.projectName,
      projectLead: req.body.projectLead,
      startDate: req.body.startDate,
      teamName: req.body.teamName,
      department: req.body.department
    };
  
    // Save Project in the database
    Project.create(project)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Project."
        });
      });
  };

  exports.findAll = (req, res) => {
    const projectName = req.query.projectName;
    var condition = projectName ? { projectName: { [Op.like]: `%${projectName}%` } } : null;
  
    Project.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Projects."
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id)
    .then(data => {
      if(!data)
        res.status(403).send({
        message: "Error: no Project exists for given projectId"
       });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

exports.getid = (req, res) => {

  if (!req.params.projectName)  {
    res.status(400).send({
      message: "projectName can not be empty!"
    });
    return;
  }

  const projectName = req.params.projectName;
  var condition = {projectName : projectName}
  Project.findOne(
    {
      attributes : [['id','projectID']],
      where : condition, 
      raw:true
    }
    )
    .then(data => {
      if(!data)
        res.status(403).send({
        message: "Error: no project exists for given projectName"
       });
      else{
        console.log(data)
        res.send(data);
      }
        
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving project with email=" + projectName
      });
    });
};

