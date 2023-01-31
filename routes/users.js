var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  
  console.log(`username:: ${req.body.username}`);
  console.log(`password:: ${req.body.password}`);
  if(req.body.username == req.body.password && typeof(req.body.username) != undefined){
    req.session.user = req.body.username;
    res.send({result:'ok', msg: 'login success'});
  }else if(req.body.username != req.body.password && typeof(req.body.username) != undefined){
    req.session.user = req.body.username;
    res.send({result:'ok', msg: 'login success'});
  }else{
    res.send({result:'fail', msg: 'login dinied'});
  }
});

module.exports = router;
