module.exports = (sequelize, Sequelize) => {
    const Register = sequelize.define("register", {
      email: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING
      }

    });
  
    return Register;
  };