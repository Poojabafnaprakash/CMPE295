var googleMapsClient = require('@google/maps').createClient({
	key : 'AIzaSyC604DlvcnjRnXKHeftAZLf2qQHd4M2DmU'
});

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
