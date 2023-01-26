var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect('/login');
  res.render('index', { title: 'Express', users: req.session.user });
});

router.get('/login', function(req, res, next) {
  delete(req.session.user);
  res.render('login', { title: 'Express' });
});

module.exports = router;