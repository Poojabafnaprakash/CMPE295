var Client = require('node-rest-client').Client;
var client = new Client();


exports.getRouteCongestionDetails = function (req, res) {

  var reqBody = {
   "Source": req.body.source,
   "Destination": req.body.destination,
    "Day": req.body.dayOfWeek
   };
  
   var args = {
    data: reqBody,
    headers: {"Content-Type": "application/json"}
  };
  var data = [
              ['1', 'Dakota Rice', 'Niger', '30%'],
              ['2', 'Minerva Hooper', 'Curaçao', '10%'],
              ['3', 'Sage Rodriguez', 'Netherlands', '40%']
  ]
  res.send(data);
 
};

exports.getRouteCongestionDetailF = function (req, res) {

  var reqBody = {
   "Source": req.body.source,
   "Destination": req.body.destination,
    "Day": req.body.dayOfWeek
   };
  
   var args = {
    data: reqBody,
    headers: {"Content-Type": "application/json"}
  };
  var data = [
              ['1', 'Dakota Rice', 'Niger', '30%'],
              ['2', 'Minerva Hooper', 'Curaçao', '10%'],
              ['3', 'Sage Rodriguez', 'Netherlands', '40%']
  ]
  res.send(data);
 

};