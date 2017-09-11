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
			var today = new Date();
				
			cronJobObj['Source'] = arrayItem.src + ', San Jose, CA';
			cronJobObj['Destination'] = arrayItem.dst + ', San Jose, CA';
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
	});
	
	Promise.all(promises).then(function() {
		fs.writeFile("./output.txt", JSON.stringify(responseObj), function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 
		res.send(responseObj); 
	}, function(err) {
		console.log(err);
	});	
}