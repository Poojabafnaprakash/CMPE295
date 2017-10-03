var googleMapsClient = require('@google/maps').createClient({
	key : 'AIzaSyDwoug5gmlX3edUXItz1b8MJMcveKFEu1A',
	Promise: Promise
});

var fs = require('fs');
var Combinatorics = require('js-combinatorics');
var Client = require('node-rest-client').Client;
var client = new Client();


exports.distance = function(req, res) {
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
	console.log(req.body.source);
	res.send("{success: 200}");
};

let getSteps = function(req) {
	  return new Promise(function(resolve, reject) {
		  googleMapsClient.directions({
				origin : req.param("source"),
				destination : req.param("destination"),
				mode : req.param("mode")
			}, function(err, response) {
				if (!err) {
					var finalSteps = []; var finalStepsObj = {}; var firstdirection = "";
					for (var key in response.json.routes[0].legs[0].steps) {
					    var htmlInstruction = response.json.routes[0].legs[0].steps[key].html_instructions;
					    var regex = /<b>\s*(.*?)\s*<\/b>/g;
					    var matches = [];
					    while (m = regex.exec(htmlInstruction)) {
					    	matches.push(m[1]);
					    }
					    if(firstdirection === "") {
					    	firstdirection = mapDirections(matches[0], "");
					    }
					    
					    if(matches.length > 1 && !("maneuver" in response.json.routes[0].legs[0].steps[key]) ) {
					    	finalStepsObj = {
					    			"streetName" : matches[1],
					    			"direction" : firstdirection,
					    			"distanceCovered" : response.json.routes[0].legs[0].steps[key].distance.text,
					    			"timeTaken" : response.json.routes[0].legs[0].steps[key].duration.text,
					    			"startTime" : response.json.routes[0].legs[0].steps[key].duration.text
					    	};
					    } else if(matches.length > 1) {
					    	firstdirection = mapDirections(firstdirection, response.json.routes[0].legs[0].steps[key].maneuver);
					    	finalStepsObj = {
					    			"streetName" : matches[1],
					    			"direction" : firstdirection,
					    			"distanceCovered" : response.json.routes[0].legs[0].steps[key].distance.text,
					    			"timeTaken" : response.json.routes[0].legs[0].steps[key].duration.text,
					    			"startTime" : response.json.routes[0].legs[0].steps[key].duration.text
					    	};
					    } else {
					    	finalStepsObj = {
					    			"streetName" : matches[0],
					    			"direction" : firstdirection,
					    			"distanceCovered" : response.json.routes[0].legs[0].steps[key].distance.text,
					    			"timeTaken" : response.json.routes[0].legs[0].steps[key].duration.text,
					    			"startTime" : response.json.routes[0].legs[0].steps[key].duration.text
					    	};
					    }
					    finalSteps.push(finalStepsObj);
					}
					var steps = {
							"Summary":[
								{ "Start": response.json.routes[0].legs[0].start_address },
								{ "End": response.json.routes[0].legs[0].end_address },
								{ "Time": response.json.routes[0].legs[0].duration.text },
								{ "StartTime": req.param("time") },
								{ "Day": req.param("day") }
							],
							"steps": finalSteps
					}
					console.log(steps);
					resolve(steps);
				} else {
					reject('Error getting response from Google');
				}
			});
	});
};



let getCongestion = function(getStepsResult) {
	return new Promise(function(resolve, reject) {
		var args = {
			    data: getStepsResult ,
			    headers: { "Content-Type": "application/json" }
		};
		client.post("http://remote.site/rest/xml/method", args, function (data, response) {
		    //console.log(data);
		    resolve(data);
		}); 
	});
};

	let winIcecream = function(message) {
	  return new Promise(function(resolve, reject) {
	    resolve( message + ' won Icecream');
	  });
	};

//	cleanRoom().then(function(result){
//		return removeGarbage(result);
//	}).then(function(result){
//		return winIcecream(result);
//	}).then(function(result){
//		console.log('finished ' + result);
//	})

let mapDirections = function(direction, menuver) {
	var newDirection;	
	if(menuver == "turn-left") {
		if(direction == "southeast") {
			newDirection = "east";
		} else if(direction == "southwest") {
			newDirection = "south";
		} else if(direction == "northwest") {
			newDirection = "west";
		} else if(direction == "northeast") {
			newDirection = "north";
		} else if(direction == "north") {
			newDirection = "west";
		} else if(direction == "south") {
			newDirection = "east";
		} else if(direction == "east") {
			newDirection = "north";
		} else if(direction == "west") {
			newDirection = "south";
		} else {
			newDirection = direction;
		}
	} else if(menuver == "turn-right") {
		if(direction == "southeast") {
			newDirection = "south";
		} else if(direction == "southwest") {
			newDirection = "west";
		} else if(direction == "northwest") {
			newDirection = "north";
		} else if(direction == "northeast") {
			newDirection = "east";
		} else if(direction == "north") {
			newDirection = "east";
		} else if(direction == "south") {
			newDirection = "west";
		} else if(direction == "east") {
			newDirection = "south";
		} else if(direction == "west") {
			newDirection = "north";
		} else {
			newDirection = direction;
		}
	} else {
		newDirection = direction;
	}
	return newDirection;
}
	
exports.userInput = function(req, res) {
	getSteps(req).then(function(result){
		return getCongestion(result)	
	}).then(function(congestionResult){
		res.send(congestionResult);
	})	
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
	for(var i = 0; i < 1; i++) {
		for(var j = 0; j < arr.length - 350; j++) {
			if(arr[i] === arr[j]) continue;
			var obj = {};
	    	obj['src'] = arr[i];
			obj['dst'] = arr[j];
			listOfObjects.push(obj);
		}	
		console.log(Object.keys(listOfObjects).length);
	}
	var promises = [];
	listOfObjects.forEach(function (arrayItem) {	   
		var cronJobObj = {};
		//console.log(arrayItem);
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
		    console.log(arrayItem.src + " " + arrayItem.dst+ " " +err);
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