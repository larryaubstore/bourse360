
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var company = require('./routes/company/company');
var tesla = require('./routes/tesla/tesla');

var requirejs = require("requirejs");

var app = express();
var chart = require('./routes/userchart');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + '/public/common')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/company/:id', company.show);
app.get('/chart/:id', chart.show);
app.get('/tesla', tesla.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
