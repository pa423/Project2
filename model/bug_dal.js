/**
 * Created by pav on 12/14/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM bug;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(bug_id, callback) {
    var query = 'SELECT * FROM bug WHERE bug_id = ?';
    var queryData = [bug_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO bug (bug_name, level) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.bug_name, params.level];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(bug_id, callback) {
    var query = 'DELETE FROM bug WHERE bug_id = ?';
    var queryData = [bug_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};