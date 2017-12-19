
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var index = require('./routes/index');
var machine = require('./api_router_v1');
var app = express();
//const httpRequest = ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); //可以带cookies
    res.header('X-Powered-By', '3.2.1');
    res.header('content-type', 'text/json;charset=utf-8');
    //res.charset = 'utf-8';
    //res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    //res.header('Pragma', 'no-cache'); // HTTP 1.0.
    //res.header('Expires', '0');
    //res.end(JSON.stringify(req));
    if (req.method === 'OPTIONS') {
        res.send(200);
    }else{
        next();
    }});
app.use('/', index);
app.use('/api/v1/',machine);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
app.listen(8001);
console.log('listener 8001');
const interval = 5  * 1000;
setInterval(require('./http/http').requestDate,interval,[interval]);
module.exports = app;
