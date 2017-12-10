var ejs = require('ejs');
var mysql = require('mysql');

var connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'CMPE295',
    port: 3306
});

exports.fetchData = function (callback, sqlQuery) {
  connectionPool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            connection.query(sqlQuery, function (err, rows, fields) {
                if (err) {
                    console.log("ERROR: " + err.message);
                } else {
                    callback(err, rows);
                }
                connection.release();
            });
        }
    });
    console.log("\nConnection closed from fetchData");
};
exports.insertData = function (callback, sqlQuery) {
  connectionPool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            connection.query(sqlQuery, function (err, rows, fields) {
                if (err) {
                    console.log("ERROR: " + err.message);
                } else {
                    callback(err, rows);
                }
                connection.release();
            });
        }
    });

    console.log("\nConnection closed from insertData..");

};
exports.updateData = function (callback, sqlQuery) {
  connectionPool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            connection.query(sqlQuery, function (err, rows, fields) {
                if (err) {
                    console.log("ERROR: " + err.message);
                } else {
                    console.log("DB Results:" + rows);
                    callback(err, rows);
                }
                connection.release();
            });
        }
    });
    console.log("\nConnection closed from updateData..");
};
