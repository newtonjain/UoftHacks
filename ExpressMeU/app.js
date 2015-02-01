var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// These are the new imports we're adding:
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Stuff we're adding:
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  key: 'sid',
  cookie: {secure: false},
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Here is what we're adding:
var strategy = new StormpathStrategy();
passport.use(strategy);

passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);
var index_routes = require('./routes/index');
var auth_routes = require('./routes/auth');
// Specify the routes here.
app.use('/', index_routes);
app.use('/', auth_routes);
