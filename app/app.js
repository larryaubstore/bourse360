
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var company = require('./routes/company/company');


//var requirejsMiddleware = require("requirejs-middleware");

var requirejs = require("requirejs");



var app = express();

//var chart = require('./routes/userchart');
var chart = require('./routes/userchart');
//var company

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

//app.use(requirejsMiddleware({
//  src: path.join(__dirname + "/public"),
//  dest: path.join(__dirname + "/build"),
//  build: true,
//  debug: true,
//  modules: {
//    "/main.js": {
//      baseUrl: path.join(__dirname + "/public"),
//      include: "main"
//    }
//  }
//}));


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));

//app.use(express.static(path.join(__dirname + "/build")));
app.use(express.static(path.join(__dirname + "/public")));

//requirejs.config({
//
//  'd3': {
//    //deps: ['underscore', 'jquery'],
//    exports: 'd3'
//  }
//});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/company/:id', company.show);

app.get('/chart/:id', chart.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
