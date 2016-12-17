/**
 * Created by pav on 12/14/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM feature;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(feature_id, callback) {
    var query = 'SELECT * FROM feature WHERE feature_id = ?';
    var queryData = [feature_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO feature (feature_name, level) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.feature_name, params.level];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(feature_id, callback) {
    var query = 'DELETE FROM feature WHERE feature_id = ?';
    var queryData = [feature_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};