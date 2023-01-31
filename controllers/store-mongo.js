const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
const dotnev = require('dotenv');

dotnev.config({path: '../config.env'});

const url = process.env.DB_LOCAL_STORE;
const dbName = process.env.DBNAME;

const getStore = function(){ 
    return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
      function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('store').find().toArray(function (err, result) {
          if (err) throw err
          //console.log(result);
          client.close();
          resolve(result);
        });
    });
    });
  };
  
  const getStoreCallback = function(callback){ 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
      function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('store').find().toArray(function (err, result) {
          if (err) throw err
          console.log(result);
          callback(result);
        });
      client.close();
    });
  };
  
  const getStoreById = function(id){
    return new Promise((resolve, reject) => {
    var record = {};
      console.log(">> getCustomerById "+ id);
      MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('store').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
          if (err) throw err
          console.log(result);
          resolve(result[0]);
          client.close();
        });
        });
    });
  };
  
  const addStore = function(record) {
    return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('store');
      collection.insertMany([record],function(err,result){
        resolve({status:'ok'});
        client.close();
      });
      });
    });
  }
  
  const deleteStore = function(id){
    return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('store');
      collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
        resolve({status:'ok'});
        client.close()
      });
       });
    });
  };
  
  const updateStore = function(users){
    return new Promise((resolve, reject) => {
      let id = users.id;
      delete(users.id);
      MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('store');
      collection.updateOne({"_id" : ObjectId(id)},{ $set: users },function(err,result){
        resolve({status:'ok'});
        client.close();
         });
      });
    });
  };
  
  const getStoreBySearch = function(field,searchText){
    return new Promise((resolve, reject) => {
      var records = [];
      //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
      //console.log("search ==> "+JSON.stringify(searchParam));
      console.log("field:"+field);
      console.log("searchText:"+searchText);
  
      MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('store').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
          if (err) throw err
          console.log("result:"+JSON.stringify(result));
          resolve(result);
          client.close();
           });
        });
    });
  }
  //sqlService.getCustomersBySearch(searchParam,callback);
  const getStoreSearchOLD = function(searchParam){
    return new Promise((resolve, reject) => {
      var records = [];
      //searhObject = {searchParam.field: '//i'}
      MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('store').find({name: /vivek/i}).toArray(function (err, result) {
          if (err) throw err
          console.log("result:"+JSON.stringify(result));
          resolve(result);
          client.close();
           });
        });
     ;
    });
  }
  
  module.exports = { getStore,addStore,updateStore,deleteStore,getStoreById };
  