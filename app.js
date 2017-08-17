var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');


var routes = require('./routes/index');
var cart = require('./routes/cart');
var users = require('./routes/users');
var menu = require('./routes/menu.js');
var special = require('./routes/special.js');

// var admin = require('./routes/admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2, process.env.SESSION_KEY3]
}));

app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/users', users);

app.get('/menu', menu.findAll);
app.get('/menu/:id', menu.findOne);
app.post('/menu', menu.addMenu);
app.delete('/menu:id', menu.deleteMenu);

app.get('/special', special.findAll);
app.get('/special/:id', special.findOne);
app.post('/special', special.addSpecial);
app.delete('/special/:id', special.deleteSpecial);

// app.get('/admin/products', admin.findAll);


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


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
