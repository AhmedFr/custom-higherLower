var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var loginRouter = require('./routes/auth/login');
var registerRouter = require('./routes/auth/register');
var forgotPasswordRouter = require('./routes/auth/forgot-password');
var newPasswordRouter = require('./routes/auth/new-password');
var categoriesRouter = require('./routes/categories');
var categoryRouter = require('./routes/category');
var playRouter = require('./routes/play');
var scoreRouter = require('./routes/score');
var likeRouter = require('./routes/like');
var valuesRouter = require('./routes/values');

const sequelize = require('./config/sequelize');
const User = require('./models/User');
const Category = require('./models/Category');
const Value = require('./models/Value');
const Score = require('./models/Score');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth/login', loginRouter);
app.use('/auth/register', registerRouter);
app.use('/auth/forgot-password', forgotPasswordRouter);
app.use('/auth/new-password', newPasswordRouter);
app.use('/categories', categoriesRouter);
app.use('/category', categoryRouter);
app.use('/play', playRouter);
app.use('/score', scoreRouter);
app.use('/like', likeRouter);
app.use('/values', valuesRouter);

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

async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
    console.log('Synced models successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

init();

module.exports = app;
