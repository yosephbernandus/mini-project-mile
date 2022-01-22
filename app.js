var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// var indexRouter = require('./app/transactions/router');
var locationRouter = require('./app/location/router');
var customerRouter = require('./app/customer/router');
var koliRouter = require('./app/koli/router');
var connoteRouter = require('./app/connote/router');
var transactionRouter = require('./app/transactions/router');

const app = express();
const URL = '/api/v1'
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// api
app.use(`${URL}/transaction`, transactionRouter);
app.use(`${URL}/location`, locationRouter);
app.use(`${URL}/customer`, customerRouter);
app.use(`${URL}/koli`, koliRouter);
app.use(`${URL}/connote`, connoteRouter);

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
