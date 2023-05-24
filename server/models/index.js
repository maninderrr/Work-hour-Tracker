const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("./Employee.model.js")(sequelize, Sequelize);
db.project = require("./Project.model.js")(sequelize, Sequelize);
db.register = require("./Register.model.js")(sequelize, Sequelize);
db.employeeProjectMapping = require("./EmployeeProjectMapping.model.js")(sequelize, Sequelize);
db.weeklyEmployeeHours = require("./WeeklyEmployeeHours.model.js")(sequelize, Sequelize);

db.project.hasOne(db.weeklyEmployeeHours, {
  foreignKey: {
    allowNull: false
  }
})

db.employee.hasOne(db.weeklyEmployeeHours, {
  foreignKey: {
    allowNull: false
  }
})
db.project.hasOne(db.employeeProjectMapping, {
  foreignKey: {
    allowNull: false
  }
})

db.employee.hasOne(db.employeeProjectMapping, {
  foreignKey: {
    allowNull: false
  }
})

db.weeklyEmployeeHours.belongsTo(db.project)
db.weeklyEmployeeHours.belongsTo(db.employee)
db.employeeProjectMapping.belongsTo(db.employee)
db.employeeProjectMapping.belongsTo(db.project)

// db.weeklyEmployeeHours = require("./WeeklyEmployeeHours.model.js");
module.exports = db;