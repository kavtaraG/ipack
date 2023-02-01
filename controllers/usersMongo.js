// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'});




const dbName = 'users';
const url = 'mongodb://localhost:27017';

const getUsers = function(){ 
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find().toArray(function (err, result) {
        if (err) throw err
        //console.log(result);
        client.close();
        resolve(result);
      });
  });
  });
};

const getUsersCallback = function(callback){ 
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result);
      });
    client.close();
  });
};

const getUsersById = function(id){
  return new Promise((resolve, reject) => {
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result[0]);
        client.close();
      });
      });
  });
};

const addUsers = function(record) {
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.insertMany([record],function(err,result){
      resolve({status:'ok'});
      client.close();
    });
    });
  });
}

const deleteUsers = function(id){
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      resolve({status:'ok'});
      client.close()
    });
     });
  });
};

const updateUsers = function(users){
  return new Promise((resolve, reject) => {
    let id = users.id;
    delete(users.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: users },function(err,result){
      resolve({status:'ok'});
      client.close();
       });
    });
  });
};

const getUsersBySearch = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}
//sqlService.getCustomersBySearch(searchParam,callback);
const getUsersSearchOLD = function(searchParam){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject = {searchParam.field: '//i'}
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find({name: /vivek/i}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
   ;
  });
}

const authUsers = function (field, username, password) {
  return new Promise((resolve, reject) => {
      var records = [];
      // console.log("field:" + field);
      // console.log("email:" + email);

      MongoClient.connect(url, {
          useNewUrlParser: true
      }, function (err, client) {
          assert.equal(null, err);
          const db = client.db(dbName);
          db.collection('users').find({
              [field]: {
                  '$regex': username,
                  '$options': 'i'
              }
          }).toArray(function (err, result) {
              if (err) throw err
              console.log("result:" + JSON.stringify(result));
              // console.log("==========password:" + result[0]['password']);

              if ((username===result[0]['username']) && (password === result[0]['password'])) {
                  // resolve(1);
                  resolve(result);
              } else {
                  resolve(0)

              }
              client.close();
          });
      });
  });
}

module.exports = { getUsers,addUsers,updateUsers,deleteUsers,getUsersById, authUsers };



