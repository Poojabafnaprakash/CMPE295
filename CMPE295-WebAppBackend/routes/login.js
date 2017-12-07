var mysql = require('./mysql');
var CryptoJS = require("crypto-js");

var SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: '295-WebServer.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);
var log = SimpleNodeLogger.createSimpleFileLogger('295-WebServer-project.log');

exports.checkLogin = function (req, res) {
    var email = req.param("email");
    var password = req.param("password");
    var json_responses;
    var fetchUser = "select * from Users where email='" + email
        + "'";
    log.info(fetchUser);
    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                var pwd = results[0].password;
                var bytes = CryptoJS.AES.decrypt(pwd.toString(), 'cmpe295');
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                if (plaintext == password) {
                    req.session.email = results[0].email;
                    req.session.name = results[0].firstname;
                    req.session.lastname = results[0].lastname;
                    req.session.id = results[0].user_id;
                    req.session.phone = results[0].phone;
                    var loginDate = results[0].lastlogin;
                    if (loginDate != null) {
                        req.session.lastlogin = loginDate.substring(0, 25);
                    } else {
                        req.session.lastlogin = '';
                    }
                    log.info("Login successfulfor the user, " + results[0].user_id);
                    json_responses = {
                        "statusCode": 200
                    };
                    res.send(json_responses);
                }
                else {
                    json_responses = {
                        "statusCode": 401
                    };
                    res.send(json_responses);
                }


            } else {
                json_responses = {
                    "statusCode": 401
                };
                res.send(json_responses);

            }
        }
    }, fetchUser);

};

exports.register = function (req, res) {
    var email = req.param("email");
    var password = req.param("password");
    var firstName = req.param("firstName");
    var lastName = req.param("lastName");
    var phone = req.param("phone");
    var json_responses;
    var dt = new Date();
    var ciphertext = CryptoJS.AES.encrypt(password, 'cmpe295');
    var insertUser = "insert into Users(email, password, firstName, lastName, lastlogin, phone) values('"
        + email
        + "','"
        + ciphertext
        + "','"
        + firstName
        + "','"
        + lastName
        + "','"
        + dt.toString()
        + "','"
        + phone
        + "')";
    mysql.insertData(function (err, results) {
        if (err) {
            throw err;
        } else {
            req.session.email = email;
            req.session.name = firstName;
            req.session.lastname = lastName;
            req.session.id = results.insertId;
            req.session.phone = phone;
            json_responses = {
                "statusCode": 200
            };
            res.send(json_responses);
        }
    }, insertUser);

};

exports.hompage = function (req, res) {
    if (req.session.email && req.session.name) {
        res
            .header(
                'Cache-Control',
                'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("homepage", {
            name: req.session.name,
            lastlogin: req.session.lastlogin
        });
    } else {
        log.info("Session expired for the user " + req.session.id);
        res.redirect('/');
    }
};

exports.userprofile = function (req, res) {
    if (req.session.email && req.session.name) {
        res.render("profilepage", {
            email: req.session.email,
            phone: req.session.phone,
            name: req.session.name,
            lastname: req.session.lastname,
            lastlogin: req.session.lastlogin
        });
    } else {
        res.redirect('/');
    }
};

exports.logout = function (req, res) {
    var dt = new Date();
    updateUser = "update Users set lastlogin= '" + dt.toString() + "' where user_id="
        + req.session.id;
    mysql.updateData(function (err, results) {
        if (err) {
            throw err;
        }
    }, updateUser);
    req.session.destroy();
    res.redirect('/');
};
