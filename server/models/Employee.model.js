module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      empName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        primary: true
      },
      manager: {
        type: Sequelize.STRING
      },
      managerID: {
        type: Sequelize.STRING
      },
      DOJ:{
        type: Sequelize.STRING
      }

    });
  
    return Employee;
  };