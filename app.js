var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const DB = process.env.DB.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(process.env.DATABASE_LOCAL).then((con) => {
  //console.log(con.connections);
  console.log('DB connection success');
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersApi = require('./routes/usersApi');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/users', usersApi);


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

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  process.on('uncaughtException', (err) => {
    if(err) throw err;
  })
  console.log('listening to the port:'+PORT);
})

module.exports = app;
