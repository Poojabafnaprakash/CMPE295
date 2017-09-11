
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , directionsAPI = require('./routes/directionsAPI')
  , index = require('./routes/index')
  , user = require('./routes/user');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/users', user.list);
app.get('/distance', directionsAPI.distance);
app.get('/time', directionsAPI.totalTime);
app.get('/latlng', directionsAPI.latLng);
app.use('/cronJob', directionsAPI.cronJob);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});