const express = require('express');
const app = express.Router();
const Users = require('../model/usersSchema')
const { getUsers, getUsersById, addUsers, updateUsers, deleteUsers } = require('../controllers/usersMongo');




app.get('/', async (req, res, next) => {
    //await Users.find().then((result) => {
        res.send(await getUsers());
    });

app.get('/:id', async (req, res, next) => {
   res.send(await getUsersById(req.params.id));
    
});

app.post('/', async (req, res, next) => {
    let rec = req.body;
    // const addUsers = await Users.create(rec);
    // console.log(addUsers);
    addUsers(rec);
    res.send({status: 'ok', msf: 'added success'});
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