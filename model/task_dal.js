/**
 * Created by pav on 12/14/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM task;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(task_id, callback) {
    var query = 'SELECT * FROM task WHERE task_id = ?';
    var queryData = [task_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO task (task_name, level) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.task_name, params.level];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(task_id, callback) {
    var query = 'DELETE FROM task WHERE task_id = ?';
    var queryData = [task_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};