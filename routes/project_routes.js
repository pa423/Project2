/**
 * Created by pav on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var project_dal = require('../model/project_dal');


// View All projects
router.get('/all', function(req, res) {
    project_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('project/projectViewAll', { 'result':result });
        }
    });

});

// View the project for the given id
router.get('/', function(req, res){
    if(req.query.project_id == null) {
        res.send('project_id is null');
    }
    else {
        project_dal.getById(req.query.project_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('project/projectViewById', {'result': result});
            }
        });
    }
});

// Return the add a new project form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    project_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('project/projectAdd', {'project': result});
        }
    });
});

// insert a project record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.project_name == null) {
        res.send('project Name must be provided.');
    }
    // else if(req.query.project_id == null) {
    //     res.send('An project must be selected');
    // }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        project_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/project/all');
            }
        });
    }
});

// Delete a project for the given project_id
router.get('/delete', function(req, res){
    if(req.query.project_id == null) {
        res.send('project_id is null');
    }
    else {
        project_dal.delete(req.query.project_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/project/all');
            }
        });
    }
});

module.exports = router;