module.exports = (sequelize, Sequelize) => {
    const WeeklyEmployeeHours = sequelize.define("weeklyEmployeeHours", {

        mondayTime: {
           type: Sequelize.FLOAT
         },
         tuesdayTime: {
            type: Sequelize.FLOAT
          },
          wednesdayTime: {
            type: Sequelize.FLOAT
          },
          thursdayTime: {
            type: Sequelize.FLOAT
          },
          fridayTime: {
            type: Sequelize.FLOAT
          },
          weekEndDate: {
            type: Sequelize.STRING
          },
          totalWeekHours: {
            type: Sequelize.FLOAT
          }

    });
  
    return WeeklyEmployeeHours;
  };