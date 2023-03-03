var express = require('express');
var router = express.Router();
const { addUsers, authUsers } = require('../controllers/usersMongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  let result = await authUsers('username',req.body.username,req.body.password);
  console.log('++++++result ',result);
  console.log('++++++_id ',result[0]['_id']);
  console.log('****** username::', result[0]['username']);
  console.log('****** password::', result[0]['username']);
  res.cookie('userId',result[0]['_id'])
  let role = result[0]['role'];

  if(result){
    req.session.user = req.body.username;
    req.session.role = role;

    res.send({result:'ok', msg: 'login success'});
  }else{
    res.send({result:'fail', msg: 'login dinied'});
  }
});

router.post('/sign_up', async function (req, res) {
  let result = await addUsers(req.body);
  req.session.user = result;
  req.session.role = 'user';
  res.send({result:'ok', msg:'record added successfully'});
});

module.exports = router;
