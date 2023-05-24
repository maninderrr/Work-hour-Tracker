module.exports = (sequelize, Sequelize) => {
    const EmployeeProjectMapping = sequelize.define("employeeProjectMapping", {
      // empID: {
      //   type: Sequelize.STRING
      // },
      // projectID: {
      //   type: Sequelize.STRING
      // }
    });
  
    return EmployeeProjectMapping;
  };