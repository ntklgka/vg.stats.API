var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/recent', db.getMostRecent);

module.exports = router;

