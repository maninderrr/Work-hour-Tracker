module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      projectName: {
        type: Sequelize.STRING
      },
      projectLead: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      teamName: {
        type: Sequelize.STRING
      },
      startDate:{
        type: Sequelize.STRING
      }

    });
  
    return Project;
  };