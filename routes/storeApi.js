const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'});

const app = express.Router();
//const {getStore, getStoreById, postStore, putStore, deleteStore} = require('../controllers/storeData');
const { getStore, getStoreById, addStore, updateStore, deleteStore } = require('../controllers/store-mongo');


const DB = process.env.DATABASE_LOCAL;
const dbName = process.env.DB_USERS;

app.get('/', async(req, res, next) => {
    try{
        MongoClient.connect(DB, (err, client) => {
            if(err) throw err;

            var db = client.db(dbName);
            db.collection('store').find(req.query).toArray((err, result) => {
                if(err) throw err;
                console.log(result);
            });
        });
        res.send(await getStore());
    }catch(err){
        if(err) throw err;
    };
    
});


app.get('/:id', async (req, res, next) => {
    try{
        MongoClient.connect(DB, (err, client) => {
            if(err) throw err;

            var db = client.db(dbName);
            db.collection('store').find(req.params.id).toArray((err, result) => {
                if(err) throw err;
                console.log(result);
            });
        });
        res.send(await getStoreById(req.params.id));
    }catch(err){
        if(err) throw err;
    };
    
    // let rec = store.filter((id) => (id, req.params.id));
    // if(rec.length > 0){
    //     res.send(rec[0]);
    // }else{
    //     res.send({});
    // };
});

app.post('/', async (req, res, next) => {
    res.send(await addStore(req.body));
    // let rec = req.body;
    // rec.id = Date.now();
    // store.push(rec);
    res.send({status: 'ok', msg: 'post success'});
});

app.put('/', async (req, res, next) => {
    
    await updateStore(req.body);
    // let rec = req.body;
    // store.map((item, index) => {
    //     if(rec.id == item.id){
    //         store[index] = rec;
    //     };
    //     res.send({status: 'ok', msg: 'update success'});
    // });
    res.send({status: 'ok', msg: 'update success'});
});


app.delete('/', async (req, res, next) => {
    res.send(await deleteStore(req.body.id));
    // let rec = req.body.id;
    // let temp = store.filter((id) => (id.id != rec));
    // rec = temp;
    res.send({status: 'ok', msg: 'delete success'});
});



module.exports = app;