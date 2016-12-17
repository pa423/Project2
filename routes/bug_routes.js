/**
 * Created by pav on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var bug_dal = require('../model/bug_dal');


// View All bugs
router.get('/all', function(req, res) {
    bug_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('bug/bugViewAll', { 'result':result });
        }
    });

});

// View the bug for the given id
router.get('/', function(req, res){
    if(req.query.bug_id == null) {
        res.send('bug_id is null');
    }
    else {
        bug_dal.getById(req.query.bug_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('bug/bugViewById', {'result': result});
            }
        });
    }
});

// Return the add a new bug form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    bug_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('bug/bugAdd', {'bug': result});
        }
    });
});

// insert a bug record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.bug_name == null) {
        res.send('bug Name must be provided.');
    }
    // else if(req.query.bug_id == null) {
    //     res.send('An bug must be selected');
    // }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        bug_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/bug/all');
            }
        });
    }
});

// Delete a bug for the given bug_id
router.get('/delete', function(req, res){
    if(req.query.bug_id == null) {
        res.send('bug_id is null');
    }
    else {
        bug_dal.delete(req.query.bug_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/bug/all');
            }
        });
    }
});

module.exports = router;