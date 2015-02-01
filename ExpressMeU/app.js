var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));


var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '/Users/alec/.stormpath/apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/2UdEMsnmguwFfzcKx73fyx',
  secretKey: 'some_long_random_string_like_this_one',
  expandCustomData: true,
  enableForgotPassword: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var logger = require('express-logger');
app.use(logger({path: "public/logfile.txt"}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(stormpathMiddleware);


module.exports = app;
app.listen(3000);

