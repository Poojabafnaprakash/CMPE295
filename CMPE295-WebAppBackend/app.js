/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , session = require('client-sessions')
    , routes = require('./routes')
    , directionsAPI = require('./routes/directionsAPI')
    , index = require('./routes/index')
    , login = require("./routes/login")
    , favorite = require("./routes/favorite")
    , graphs = require("./routes/graphs")
    , user = require('./routes/user')
    , update = require('./routes/update')
    , table = require('./routes/table');

var app = express();

app.use(session({
    cookieName: 'session',
    secret: 'cmpe295',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

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
app.get('/distance', directionsAPI.directions);
app.get('/time', directionsAPI.totalTime);

app.use('/api/cronJob', directionsAPI.cronJob);
app.post('/api/latlng', directionsAPI.latLng);
app.post('/api/checklogin', login.checkLogin);
app.post('/api/register', login.register);
app.get('/api/homepage', login.hompage);
app.post('/api/logout', login.logout);
app.post('/api/setFavorite', favorite.setFavorite);
app.post('/api/updateProfile', update.updateProfile);
app.post('/api/routeTavelTime', graphs.setRouteTavelTime);
app.post('/api/routeCongestionRate', graphs.setRouteCongestionRate);
app.post('/api/routeCongestionDetails', table.getRouteCongestionDetails);
app.post('/api/userInput', directionsAPI.getDashboardCongestionRate);
app.post('/api/congestionPerStreet', graphs.setStreetCongestionRate);

http.createServer(app).listen(app.get('port'), "0.0.0.0", function () {
    console.log('Express server listening on port ' + app.get('port'));
});
