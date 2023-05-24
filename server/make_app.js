var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee.routes.js');
var registerRouter = require('./routes/register.routes');
var loginRouter = require('./routes/login.routes');
var hourRouter = require('./routes/employeeWeeklyHours.routes.js')
var projectRouter = require('./routes/project.routes');
var summaryRouter = require('./routes/summary.routes');
var mappingRouter = require('./routes/mapping.routes');
const express = require("express");
// const cors = require("cors");

exports.init = (database) => {
  const app = express();

  // var corsOptions = {
  //   origin: "http://localhost:8081"
  // };

  // app.use(cors(corsOptions));

  database.sequelize.sync();

  /* Uncomment the below lines for setting up new Tables on every run*/
  // const db = require("./models");
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-Fww-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to WHT application." });
  });



  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/employee', employeeRouter);
  app.use('/register', registerRouter);
  app.use('/project', projectRouter);
  app.use('/login', loginRouter);
  app.use('/hours',hourRouter);
  app.use('/summary',summaryRouter);
  app.use('/mapping',mappingRouter);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}
