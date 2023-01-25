var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
  console.log(`username:: ${req.body.username}`);
  console.log(`password:: ${req.body.password}`);
  if(req.body.username == req.body.password && typeof(req.body.username) != 'undefined'){
    res.send({status: 'ok', msg: 'login success'});
  }else{
    res,send({status: 'fail', msg: 'login dinied'});
  }
});

module.exports = router;
