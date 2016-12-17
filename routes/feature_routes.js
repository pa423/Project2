/**
 * Created by pav on 12/16/2016.
 */
var express = require('express');
var router = express.Router();
var feature_dal = require('../model/feature_dal');


// View All features
router.get('/all', function(req, res) {
    feature_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('feature/featureViewAll', { 'result':result });
        }
    });

});

// View the feature for the given id
router.get('/', function(req, res){
    if(req.query.feature_id == null) {
        res.send('feature_id is null');
    }
    else {
        feature_dal.getById(req.query.feature_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('feature/featureViewById', {'result': result});
            }
        });
    }
});

// Return the add a new feature form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    feature_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('feature/featureAdd', {'feature': result});
        }
    });
});

// insert a feature record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.feature_name == null) {
        res.send('feature Name must be provided.');
    }
    // else if(req.query.feature_id == null) {
    //     res.send('An feature must be selected');
    // }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        feature_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/feature/all');
            }
        });
    }
});

// Delete a feature for the given feature_id
router.get('/delete', function(req, res){
    if(req.query.feature_id == null) {
        res.send('feature_id is null');
    }
    else {
        feature_dal.delete(req.query.feature_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/feature/all');
            }
        });
    }
});

module.exports = router;