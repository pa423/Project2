/**
 * Created by pav on 12/16/2016.
 */
/**
 * Created by pav on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');


// View All teams
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});

// View the team for the given id
router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewById', {'result': result});
            }
        });
    }
});

// Return the add a new team form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('team/teamAdd', {'team': result});
        }
    });
});

// insert a team record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('team Name must be provided.');
    }
    // else if(req.query.team_id == null) {
    //     res.send('An team must be selected');
    // }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

// Delete a team for the given team_id
router.get('/delete', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});

module.exports = router;