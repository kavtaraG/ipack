var express = require('express');
var router = express.Router();
const fs = require('fs');
const { getUsers, getUsersById } = require('../controllers/usersMongo');
const { getStore, getStoreById } = require('../controllers/storeData.js');

let day = JSON.parse((fs.readFileSync(`${__dirname}/../public/day.json`)));
let dayMap = day.map((item) => (day, item));

let mounth = JSON.parse(fs.readFileSync(`${__dirname}/../public/mounth.json`));
let mounthMap = mounth.map((item) => (mounth, item));

let year = JSON.parse(fs.readFileSync(`${__dirname}/../public/year.json`));
let yearMap = year.map((item) => (year, item));

let country = JSON.parse(fs.readFileSync(`${__dirname}/../public/country.json`));
let countryMap = country.map((item) => (country, item));


router.get('/', function(req, res, next) {
  res.redirect('/login');
  //res.render('index', { title: 'Express', users: req.session.user });
});
  
  //users table
  router.get('/users_table', async function(req, res, next) {
    res.render('users', { data: await getUsers() });
  });
  
  router.get('/users_table/edit/:id', async function(req, res, next) {
    let users = await getUsersById(req.params.id);
    method = 'PUT';
    res.render('register', { method, buttonName: 'Edit', users,
    day: dayMap, mounth: mounthMap, year: yearMap, country: countryMap   });
  });

  //store table
  router.get('/store_table', function(req, res, next) {
    res.render('store-table', { data: getStore() });
  });

  //under contruction
  //***************** */
  router.get('/store_table/edit/:id', function(req, res, next) {
    let store =  getStoreById(req.params.id);
    //method = 'PUT';
    res.render('store_table', {   store
    /*day: dayMap, mounth: mounthMap, year: yearMap, country: countryMap */  });
  });

  //store routes
  router.get('/item_1', async function(req, res, next) {
    res.render('item1', { });
  });

  router.get('/item_2', async function(req, res, next) {
    res.render('item2', { });
  });

  router.get('/item_3', async function(req, res, next) {
    res.render('item3', { });
  });

module.exports = router;