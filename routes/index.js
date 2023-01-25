var express = require('express');
const fs = require('fs');
var router = express.Router();
const { getUsers, getUsersById } = require('../controllers/usersData');


let day = JSON.parse((fs.readFileSync(`${__dirname}/../public/day.json`)));
let dayMap = day.map((item) => (day, item));

let mounth = JSON.parse(fs.readFileSync(`${__dirname}/../public/mounth.json`));
let mounthMap = mounth.map((item) => (mounth, item));

let year = JSON.parse(fs.readFileSync(`${__dirname}/../public/year.json`));
let yearMap = year.map((item) => (year, item));

let country = JSON.parse(fs.readFileSync(`${__dirname}/../public/country.json`));
let countryMap = country.map((item) => (country, item));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/sing_up', function(req, res, next) {
  let users = {};
  method = 'POST';
  res.render('register', { buttonName: 'Submit', users, method, 
  day: dayMap, mounth: mounthMap, year: yearMap, country: countryMap });
});

router.get('/users_table', async function(req, res, next) {
  res.render('users', { data: await getUsers() });
});

router.get('/users_table/edit/:id', async function(req, res, next) {
  let users = await getUsersById(req.params.id);
  method = 'PUT';
  res.render('register', { method, buttonName: 'Edit', users,
  day: dayMap, mounth: mounthMap, year: yearMap, country: countryMap   });
});

module.exports = router;