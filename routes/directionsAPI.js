
var googleMapsClient = require('@google/maps').createClient({
	  key: 'AIzaSyC604DlvcnjRnXKHeftAZLf2qQHd4M2DmU'
	});

exports.directions = function(req, res){
  //res.render('index', { title: 'Express' });

  googleMapsClient.directions({
	  origin: [37.3328228,-121.9142344],
	  destination: [37.3351916,-121.8832655],
	  mode: 'driving'
  }, function(err,response){
	  if (!err) {
		  res.send(response.json);
		    console.log(response.json);
		  } 
  });
  
//  googleMapsClient.distanceMatrix({
//	  origins: [37.3328228,-121.9142344],
//	  destinations: [37.3351916,-121.8832655],
//	  mode: 'driving'
//  }, function(err,response){
//	  if (!err) {
//		  res.send(response.json);
//		    console.log(response.json);
//		  } 
//  });
  

};