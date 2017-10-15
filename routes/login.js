var mysql = require('./mysql');
var CryptoJS = require("crypto-js");
var SimpleNodeLogger = require('simple-node-logger'),
opts = {
	logFilePath:'mylogfile.log',
	timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger( opts );
var log = SimpleNodeLogger.createSimpleFileLogger('project.log');

exports.checkLogin = function(req, res) {
	// These two variables come from the form on
	// the views/login.hbs page
	var email = req.param("email");
	var password = req.param("password");
	var json_responses;
	var getUser = "select * from members where email='" + email
			+ "'";
	log.info(getUser);
	mysql.fetchData(function(err, results) {
		console.log("DB Results:" + results);
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				var pwd = results[0].password;
				var bytes  = CryptoJS.AES.decrypt(pwd.toString(), 'cmpe295');
				var plaintext = bytes.toString(CryptoJS.enc.Utf8);
				console.log(password);
				console.log("plaintext: " + plaintext);
				if(plaintext == password){
					req.session.email = results[0].email;
					req.session.name = results[0].firstname;
					req.session.lastname = results[0].lastname;
					req.session.id = results[0].user_id;
					req.session.phone = results[0].phone;
					var lastlogdt = results[0].lastlogin;
					if(lastlogdt!=null){
						req.session.lastlogin = lastlogdt.substring(0,25);
					}else{
						req.session.lastlogin = '';
					}
					log.info("Login successfulfor the user, "+results[0].user_id);
					json_responses = {
						"statusCode" : 200
					};
					res.send(json_responses);
				}
				else{
					json_responses = {
							"statusCode" : 401
						};
						res.send(json_responses);
				}
				

			} else {
				json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);

			}
		}
	}, getUser);

};

exports.register = function(req, res) {
	var email = req.param("email");
	var password = req.param("password");
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var phone = req.param("phone");
	var json_responses;
	var dt = new Date();
	var ciphertext = CryptoJS.AES.encrypt(password, 'cmpe295');
	var insertUser = "insert into members(email,password,firstName,lastName,lastlogin,phone) values('"
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
	console.log("before mysql: "+insertUser);
	mysql.insertData(function(err, results) {
		console.log("DB Results in login:" + JSON.stringify(results));
		console.log("req: " + req.session);
		if (err) {
			throw err;
		} else {
			req.session.email = email;
			req.session.name = firstName;
			req.session.lastname = lastName;
			req.session.id = results.insertId;
			req.session.phone = phone;
			json_responses = {
				"statusCode" : 200
			};
			res.send(json_responses);
		}
	}, insertUser);

};

exports.redirectToHomepage = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		log.info("The user "+req.session.id+ "accessing /homepage");
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage", {
			name : req.session.name,
			lastlogin : req.session.lastlogin
		});
	} else {
		log.info("Session expired for the user "+req.session.id);
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.userprofile = function(req, res) {
	// Checks before redirecting whether the session is valid
	if (req.session.email && req.session.name) {
		log.info("The user "+req.session.id+"accessing /userprofile");
		res.render("profilepage", {
			email : req.session.email,
			phone : req.session.phone,
			name : req.session.name,
			lastname : req.session.lastname,
			lastlogin : req.session.lastlogin
		});
	} else {
		res.redirect('/');
	}
};

exports.logout = function(req, res) {
	log.info("The user "+req.session.id+ "logging out");
	var dt = new Date();
	updateUser = "update members set lastlogin= '" + dt.toString() + "' where user_id="
			+ req.session.id;
	mysql.updateData(function(err, results) {
		console.log("DB Results:" + results);
		if (err) {
			throw err;
		}
	}, updateUser);
	req.session.destroy();
	res.redirect('/');
};