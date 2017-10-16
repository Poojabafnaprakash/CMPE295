var googleMapsClient = require('@google/maps').createClient({
	key : 'AIzaSyCEkzGdbrRZw9NyFeiccZdoac2FBOyKW1g',
	Promise: Promise
});

var fs = require('fs');
var Client = require('node-rest-client').Client;
var client = new Client();
var cron = require('node-cron');


var task = cron.schedule('*/30 * * * *', function() {
//var task = cron.schedule('*/2 * * * *', function() {
	var arr = fs.readFileSync(
	'../cronjobstreets.json');
var responseObj = [];
var promises = [];
var listOfObjects = JSON.parse(arr);
var today = new Date();
listOfObjects.forEach(function (arrayItem) {	   
	var cronJobObj = {};
	console.log(arrayItem);
	promises.push(
	googleMapsClient.directions({
		origin : arrayItem.src + ', San Jose, CA',
		destination : arrayItem.dst + ', San Jose, CA',
		mode : 'driving'
	}).asPromise()
	  .then((response) => {	
		cronJobObj['Source'] = arrayItem.src + ', San Jose, CA';
		cronJobObj['Destination'] = arrayItem.dst + ', San Jose, CA';
		cronJobObj['Date'] = today.getMonth() + "/"
						+ today.getDate() + "/"
						+ today.getFullYear();
		cronJobObj['Time'] = today.getHours();
		cronJobObj['TravelTime'] = response.json.routes[0].legs[0].duration;
		cronJobObj['StartLatLng'] = response.json.routes[0].legs[0].start_location;
		cronJobObj['EndLatLng'] = response.json.routes[0].legs[0].end_location;
		cronJobObj['Steps'] = response.json.routes[0].legs[0].steps;
		responseObj.push(cronJobObj);
	  })
	  .catch((err) => {
	    console.log(arrayItem.src + " " + arrayItem.dst+ " " +err);
	  }));		
	});
	
	Promise.all(promises).then(function() {
		var filename = '../data/output-' + today.getMonth() + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + '-'+ today.getMinutes() +'.json';
		fs.writeFile(filename, JSON.stringify(responseObj), { flag: "wx" }, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		
		    console.log("The file was saved!");
		}); 
	}, function(err) {
		console.log(err);
	});	
}, false);

task.start();