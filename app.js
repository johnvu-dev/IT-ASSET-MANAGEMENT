/**
 * This function does:
 * + Handle routing
 *
 * @param {type} parameters The parameters to the function.
 * @returns {type} The return value of the function.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const taskController = require('./controllers/taskController');
const employeeController = require('./controllers/employeeController');
//work with categoriesController_old
// const categoriesController = require('./controllers/categoriesController');

const bodyParser = require('body-parser'); // Add this line
const sequelize = require('./db');


var app = express();

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

app.use('/api/v2', require('./controllers/api_v2'));
app.use('/auth', require('./controllers/authController'));
//work with categoriesController_new
//improve viewer
app.use('/categories', require('./controllers/categoriesController'));


// view engine setup: JADE
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// view engine setup: EJS


app.use(express.static(path.join(__dirname, 'src')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// Path to our public directory



// Add this line to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log('Database synced');
});

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.render('dashboard', { username: req.session.username });
  } else {
    res.redirect('/auth/login');
  }
});

app.get('/task', taskController.index);
app.get('/task/add', taskController.addForm);
app.post('/task/add', taskController.add);
app.get('/task/edit/:id', taskController.editForm);
app.post('/task/edit/:id', taskController.edit);
app.get('/task/delete/:id', taskController.delete);

app.get('/employee', employeeController.index);
app.get('/employee/add', employeeController.addForm);
app.post('/employee/add', employeeController.add);
app.get('/employee/edit/:id', employeeController.editForm);
app.post('/employee/edit/:id', employeeController.edit);
app.get('/employee/delete/:id', employeeController.delete);

//work with categoriesController_old
// app.get('/categories', categoriesController.index);
// app.get('/categories/add', categoriesController.addForm);
// app.post('/categories/add', categoriesController.add);
// app.get('/categories/edit/:id', categoriesController.editForm);
// app.post('/categories/edit/:id', categoriesController.edit);
// app.get('/categories/delete/:id', categoriesController.delete);

//DEFAUT CODE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'..', 'src'))); //lấy về thư mục gốc

//app.use('/', indexRouter);
// app.use('/users', usersRouter);

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

module.exports = app;
