var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var ejs = require('ejs')
var app = express();
var session = require('express-session')
//
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
//连接MongoDB数据库
// mongoose.connect('mongodb://192.168.50.205:27017/Campus_Payment',{ useNewUrlParser: true });

//=======路由信息（接口地址)存放在./router目录下=======
var noticesRouter = require('./routes/notices');// 测试接口
var usersRouter = require('./routes/users');// 用户信息接口
var workerRouter = require('./routes/workers');//工作人员接口
var indexRouter = require('./routes/index');
//======路由信息

//======模板
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');
//======模板

// 使用session中间件
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, //
  // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 60 * 24,
    httpOnly: true, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use(logger('dev'));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notices', noticesRouter);
app.use('/worker',workerRouter);
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

