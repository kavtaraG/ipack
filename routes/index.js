var express = require('express');
var router = express.Router();
const fs = require('fs');

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
  //res.redirect('/login');
  res.render('index', { title: 'Express', users: req.session.user  });
});

router.get('/login', function(req, res, next) {
  delete(req.session.user);
  res.render('login', { title: 'Express' });
});

router.get('/sing_up', function(req, res, next) {
  let users = {};
  method = 'POST';
  res.render('register', { buttonName: 'Submit', users, method, 
  day: dayMap, mounth: mounthMap, year: yearMap, country: countryMap });
});

module.exports = router;