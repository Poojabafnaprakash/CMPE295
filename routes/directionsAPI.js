
var googleMapsClient = require('@google/maps').createClient({
	  key: 'AIzaSyC604DlvcnjRnXKHeftAZLf2qQHd4M2DmU'
	});

exports.directions = function(req, res){
	var source = req.param("source");
	var destination = req.param("destination");
  googleMapsClient.directions({
	  origin: req.param("source"),
	  destination: req.param("destination"),
	  mode: req.param("mode")	 
  }, function(err,response){
	  if (!err) {
		  res.send(response.json);
	  }
  });
};