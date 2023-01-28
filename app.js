var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const Users = require('./model/usersSchema');

dotenv.config({path: './config.env'});
mongoose.set('strictQuery', true);

// const DB = process.env.DB.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(process.env.DATABASE_LOCAL).then((con) => {
  
  console.log(con.connections);
  console.log('DB connection success');
});

console.log(Users);
const session = require('cookie-session');

var indexRouter = require('./routes/index');
var singupRouter = require('./routes/index');
var logoutRouter = require('./routes/index');
var secureRouter = require('./routes/secue-pages');
var usersRouter = require('./routes/users');
var userTable = require('./routes/secue-pages');
var storeTable = require('./routes/secue-pages');
var usersApi = require('./routes/usersApi');
var storeApi = require('./routes/storeApi');
//partials
var item1Router = require('./routes/secue-pages');
var item2Router = require('./routes/secue-pages');
var item3Router = require('./routes/secue-pages');



var app = express();

var sess = {
  // name:'connect.sid',
  name: 'connect.sid.sig',
  secret: 'keyboard cat',
  resave: true,
  proxy: true,
  saveUninitialized: true,
  cookie: { }
};

app.use(session(sess));

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
app.use('/sing_uo', singupRouter);
app.use('/logut', logoutRouter);
//test
app.use('/api/v1/store', storeApi);
app.use('/item_1', item1Router);
app.use('/item_2', item2Router);
app.use('/item_3', item3Router);

//checkpoint
app.use((req, res, next) => {
  if(req.session.user && req.session.user.length > 2){
    next();
  }else{
    res.redirect('/login');
  }
})

//security
app.use('/', secureRouter);
app.use('/users_table', userTable);
app.use('/store_table', storeTable);
app.use('/api/v1/users', usersApi);
//app.use('/api/v1/store', storeApi);
//app.use('/item_1', item1Router);
//app.use('/item_2', item2Router);
//app.use('/item_3', item3Router);


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
    // if(err) throw err;
  })
  console.log('listening to the port:'+PORT);
})

module.exports = app;