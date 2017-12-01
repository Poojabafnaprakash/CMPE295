var Client = require('node-rest-client').Client;
var client = new Client();

var makeBody = function(req) {
  return new Promise(function (resolve, reject) {
    var reqBody = {
      "Source": req.body.source,
      "Destination": req.body.destination,
      "Day": req.body.dayOfWeek,
      "Time": req.body.timeOfDay
    };
    resolve(reqBody);
  });
}

var getRouteTravelTime = function(getReqBody) {
  return new Promise(function(resolve, reject) {
    var args = {
      data: getReqBody,
      headers: {"Content-Type": "application/json"}
    };
    // client.post("http://130.65.159.175:5000/getTravelTimeVsTime", args, function (data, response) {
    //   resolve(data);
    // });
    client.post("http://130.65.159.197:5000/getTravelTimeVsTime", args, function (data, response) {
      resolve(data);
    });
  });
}

var getRouteCongestionRate = function(getReqBody) {
  return new Promise(function(resolve, reject) {
    var args = {
      data: getReqBody,
      headers: {"Content-Type": "application/json"}
    };
    client.post("http://130.65.159.197:5000/getCongestionVsTime", args, function (data, response) {
      resolve(data);
    });
  });
}

exports.setRouteTavelTime = function (req, res) {

  // var reqBody = {
  //   "Source": req.body.source,
  //   "Destination": req.body.destination,
  //   "Day": req.body.dayOfWeek
  // };
  //
  // var args = {
  //   data: reqBody,
  //   headers: {"Content-Type": "application/json"}
  // };
  //
  // client.post("http://130.65.159.175:5000/getTravelTimeVsTime", args, function (data, response) {
  //   res.send(data);
  // });

  makeBody(req).then(function(resultBody){
    return getRouteTravelTime(resultBody)
  }).then(function(routeTravelTimeResult){
    console.log(routeTravelTimeResult);
    res.send(routeTravelTimeResult);
  });

};


exports.setRouteCongestionRate = function (req, res) {

  makeBody(req).then(function(resultBody){
    return getRouteCongestionRate(resultBody)
  }).then(function(routeCongestionRateResult){
    console.log(routeCongestionRateResult);
    res.send(routeCongestionRateResult);
  });

};

exports.setStreetCongestionRate = function (req, res) {

  var reqBody = {
    "Street": req.body.Street,
    "Direction": req.body.Direction,
    "Time": req.body.Time
  };

  var args = {
    data: reqBody,
    headers: {"Content-Type": "application/json"}
  };

  client.post("http://130.65.159.197:5000/CongestionPerStreet", args, function (data, response) {
    res.send(data);
  });

};

