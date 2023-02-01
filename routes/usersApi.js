const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');


dotenv.config({path: '../config.env'});

const app = express.Router();
// const Users = require('../model/usersSchema')
const { getUsers, getUsersById, addUsers, updateUsers, deleteUsers } = require('../controllers/usersMongo');

const DB = process.env.DATABASE_LOCAL;
const dbNAme = process.env.DB_USERS;

app.get('/', async (req, res, next) => {
    try{
        let queryObj = { ...req.query };
       
        MongoClient.connect(DB, {}, (err, client) => {
            if(err) throw err;

            var db = client.db(dbNAme);
            db.collection('users').find(queryObj).toArray((err, result) => {
                if(err) throw err;
                console.log(result);
            });
        });
        
        res.send(await getUsers());
    
    }catch(err){
        if(err) throw err;
    };
        
    });

app.get('/:id', async (req, res, next) => {
    try{
        
        MongoClient.connect(DB, {}, (err, client) => {
            if(err) throw err;
    
            var db = client.db(dbNAme);
            db.collection('users').find(req.params.id).toArray((err, result) => {
                if(err) throw err;
                console.log(result);
            });
        });
        res.send(await getUsersById(req.params.id));
    }catch(err){
        if(err) throw err;
    };
        
    });

app.post('/', async (req, res, next) => {
    let rec = req.body;
    // const addUsers = await Users.create(rec);
    // console.log(addUsers);
    await addUsers(rec);
    res.send({status: 'ok', msg: 'added success'});
});

app.put('/', async (req, res, next) => {
    const rec = req.body;
    await updateUsers(rec);
    
    res.send({status: 'ok', msg: 'update success'});
});

app.delete('/', async (req, res, next) => {
    await deleteUsers(req.body.id);
    res.send({result:'ok',msg:'record deleted successfully'});
});


module.exports = app;