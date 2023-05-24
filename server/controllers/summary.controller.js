var db
if(process.env.NODE_ENV == 'test'){
  db = require("../routes/test/dbMock");
} else{
  db = require("../models");
}
const WeeklyEmployeeHours = db.weeklyEmployeeHours;
const Projects = db.project
const sequelize = db.sequelize;

exports.summarize = (req, res) => {

    if (!req.params.weekEndDate)  {
        res.status(400).send({
          message: "Weekend date needs to be send for creaating a summaary!"
        });
        return;
      }

    
    const weekEnd = req.params.weekEndDate;
    var condition = { weekEndDate: weekEnd }; 

    Projects.findAll({
      include:[{
        model:WeeklyEmployeeHours,
        attributes : [[sequelize.fn('sum', sequelize.col('totalWeekHours')), 'haurs_per_project']],
        where:condition,
        require:true
      }],
      attributes : [
        ['projectName','projectName'],
      ],
      group: ['projectName'],
      raw : true
    }).then(data => {
        if(data!=null)
        {
          WeeklyEmployeeHours.findAll({
            attributes: [ 
              [sequelize.fn('sum', sequelize.col('totalWeekHours')), 'total_working_haurs_in_week'],
            ],
            where : condition,
            raw : true
          }).then(total_ans => {
            if(total_ans!=null)
            {
              const total_working_haurs_in_week = total_ans[0]['total_working_haurs_in_week']

              for (let i = 0; i < data.length; i++) {
                data[i]['weeklyEmployeeHour.haurs_per_project'] = (data[i]['weeklyEmployeeHour.haurs_per_project']) / (total_working_haurs_in_week);
              }

              const updatedJson = JSON.stringify( data );
              let a = updatedJson.replaceAll("\"weeklyEmployeeHour.haurs_per_project\":", "\"percentage\":");
              console.log(a);
              res.send(a);
            }
          })
        }
        else{
          console.log("data is null\n");
        }

    })
  
  };
  