var Client = require('node-rest-client').Client;
var client = new Client();


exports.getRouteCongestionDetails = function (req, res) {

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var time = req.body.timeOfDay;
  var dayOfWeek2 = req.body.dayOfWeek;

  var time2SplitArr = time.split(':');
  var time2 = time2SplitArr[0] + ":00:00";
  var time2part = parseInt(time2SplitArr[0], 10) + 1;

  if(time2 === "23:00:00") {
    time2 = "00:00:00";
    if(req.body.dayOfWeek === "Sunday") {
      dayOfWeek2 = days[0];
    } else {
      dayOfWeek2 = days[days.indexOf(req.body.dayOfWeek) + 1];
    }
  } else {
    if(time2part < 10) {
      time2 = "0" + time2part + ":00:00";
    } else {
      time2 = time2part + ":00:00";
    }
  }

  var reqBody = {
    "Source": req.body.source,
    "Destination": req.body.destination,
    "Day1": req.body.dayOfWeek,
    "Day2": dayOfWeek2,
    "Time1": req.body.timeOfDay,
    "Time2": time2
   };

   var args = {
    data: reqBody,
    headers: {"Content-Type": "application/json"}
  };

  var resData = {
    tableList: [
      { "streetName": ["casa verde", "zanker", "n st"],
        "direction": ["south", "north", "south"],
        "congestionRate": ["30%", "40%", "60%"]
      }, {
        "streetName": ["casa verde", "zanker", "n st"],
        "direction": ["south", "north", "south"],
        "congestionRate": ["30%", "40%", "60%"]
      }]
  };

  // to do
  // client.post("http://130.65.159.175:5000/CongestionPerStreet", args, function (data, response) {
  //   res.send(data);
  // });

  res.send(resData);

};
