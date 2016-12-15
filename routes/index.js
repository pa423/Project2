var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Management System', subtitle: 'By: Pavan Asuti' });
});

router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs', { title: 'cs355'});
});
module.exports = router;
