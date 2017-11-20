var mysql = require('./mysql');

exports.setFavorite = function (req, res) {
    var source = req.param("source");
    var destination = req.param("destination");
    var timeOfDay = req.param("time");
    var dayOfWeek = req.param("day");
    var json_responses;
    var insertUserFavorite = "insert into Favorite(tid) select tid "
        + "from Travel where uid = (Select id from Users where email='"
        + req.session.email
        + "') and NOT EXISTS (select tid from Favorite where Favorite.tid = Travel.tid)";
    console.log("before mysql: " + insertUserFavorite);
    mysql.insertData(function (err, results) {
        if (err) {
            throw err;
        } else {
            json_responses = {
                "statusCode": 200
            };
            res.send(json_responses);
        }
    }, insertUserFavorite);
};