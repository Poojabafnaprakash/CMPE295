var googleMapsClient = require('@google/maps').createClient({
	key : 'AIzaSyDwoug5gmlX3edUXItz1b8MJMcveKFEu1A',
	Promise: Promise
});

var fs = require('fs');
var Combinatorics = require('js-combinatorics');

exports.distance = function(req, res) {
	googleMapsClient.directions({
		origin : req.param("source"),
		destination : req.param("destination"),
		mode : req.param("mode")
	}, function(err, response) {
		if (!err) {
			res.send(response.json.routes[0].legs[0].distance);
		}
	});
};

exports.totalTime = function(req, res) {
	googleMapsClient.directions({
		origin : req.param("source"),
		destination : req.param("destination"),
		mode : req.param("mode")
	}, function(err, response) {
		if (!err) {
			res.send(response.json.routes[0].legs[0].duration);
		}
	});
};

exports.latLng = function(req, res) {
	googleMapsClient
			.directions(
					{
						origin : req.param("source"),
						destination : req.param("destination"),
						mode : req.param("mode")
					},
					function(err, response) {
						if (!err) {
							var latlng = {
								"sourceLatLng" : response.json.routes[0].legs[0].start_location,
								"destinationLatlng" : response.json.routes[0].legs[0].end_location
							}
							res.send(latlng);
						}
					});
};

exports.directions = function(req, res) {
	googleMapsClient.directions({
		origin : req.param("source"),
		destination : req.param("destination"),
		mode : req.param("mode")
	}, function(err, response) {
		if (!err) {
			res.send(response.json.routes[0].legs[0].steps);
		}
	});
};

// to store in MongoDB - Source | Destination | Date | Time | TravelTime |
// startLatlong | End Lat/long
exports.cronJob = function(req, res) {
	var arr = fs.readFileSync(
			'./streets.txt').toString().split(
			"\n");
	var listOfObjects = [];
	var responseObj = [];
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if(arr[i] === arr[j]) continue;
			var obj = {};
	    	obj['src'] = arr[i];
			obj['dst'] = arr[j];
			listOfObjects.push(obj);
		}		
	}
	var promises = [];
	for(var i = 0; i < 3; i++) {
		var cronJobObj = {};
		console.log(listOfObjects);
		promises.push(
		googleMapsClient.directions({
			origin : listOfObjects[i].src + ', San Jose, CA',
			destination : listOfObjects[i].dst + ', San Jose, CA',
			mode : 'driving'
		}).asPromise()
		  .then((response) => {
			var today = new Date();
				
			cronJobObj['Source'] = listOfObjects[i].src + ', San Jose, CA';
			cronJobObj['Destination'] = listOfObjects[i].dst + ', San Jose, CA';
			cronJobObj['Date'] = today.getMonth() + "/"
							+ today.getDate() + "/"
							+ today.getFullYear();
			cronJobObj['Time'] = today.getHours();
			cronJobObj['TravelTime'] = response.json.routes[0].legs[0].duration;
			cronJobObj['StartLatLng'] = response.json.routes[0].legs[0].start_location;
			cronJobObj['EndLatLng'] = response.json.routes[0].legs[0].end_location;
			responseObj.push(cronJobObj);
		  })
		  .catch((err) => {
		    console.log(err);
		  }));		
	}
	
	Promise.all(promises).then(function() {
		res.send(responseObj); 
	}, function(err) {
		console.log(err);
	});	
}