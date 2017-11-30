var mysql = require('./mysql');

exports.updateProfile = function (req, res) {
    var email = req.param("email");
    var phone = req.param("phone");
    var firstName = req.param("firstName");
    var lastName = req.param("lastName");
    var address = req.param("adress");
    var city = req.param("city");
    var country = req.param("country");
    var postal = req.param("postal");
    var json_responses;
    var updateUserProfile = "Update Users Set phone = '"+phone+"', firstname = '"
                            +firstName+"', lastName = '"+lastName+"', address = '"+address+ "', city ='"
                            +city+"', country = '"+country+"', postalcode = '"+postal+"' where email = '"+email+"'";
        mysql.updateData(function (err, results) {
        if (err) {
            throw err;
        } else {
            json_responses = {
                "statusCode": 200
            };
            res.send(json_responses);
        }
    }, updateUserProfile);
};