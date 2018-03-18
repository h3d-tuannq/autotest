var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/control', function(req, res, next) {
  console.log('render index ');
  res.render('control');
});

router.get('/', function(req, res, next) {
    console.log('render index ');
    res.render('index');
});

module.exports = router;
