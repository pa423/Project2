/**
 * Created by pav on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var task_dal = require('../model/task_dal');


// View All tasks
router.get('/all', function(req, res) {
    task_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('task/taskViewAll', { 'result':result });
        }
    });

});

// View the task for the given id
router.get('/', function(req, res){
    if(req.query.task_id == null) {
        res.send('task_id is null');
    }
    else {
        task_dal.getById(req.query.task_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('task/taskViewById', {'result': result});
            }
        });
    }
});

// Return the add a new task form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    task_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('task/taskAdd', {'task': result});
        }
    });
});

// insert a task record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.task_name == null) {
        res.send('task Name must be provided.');
    }
    // else if(req.query.task_id == null) {
    //     res.send('An task must be selected');
    // }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        task_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/task/all');
            }
        });
    }
});

// Delete a task for the given task_id
router.get('/delete', function(req, res){
    if(req.query.task_id == null) {
        res.send('task_id is null');
    }
    else {
        task_dal.delete(req.query.task_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/task/all');
            }
        });
    }
});

module.exports = router;