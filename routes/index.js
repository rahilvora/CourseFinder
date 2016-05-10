var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('AdminViews/AdminPanel', { title: 'AdminPanel' });
});

router.get('/user', function(req, res, next) {
  res.render('Users/index', { title: 'AdminPanel' });
});
module.exports = router;
