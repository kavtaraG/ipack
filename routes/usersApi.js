const express = require('express');
const app = express.Router();
const { getUsers, getUsersById, addUsers, updateUsers, deleteUsers } = require('../controllers/usersData');

// let data = [ {
//     "id": 1,
//     "username": "giorgi",
//     "password": "123456",
//     "firstname": "giorgi",
//     "lastname": "giortgi",
//     "day": 3,
//     "mounth":3,
//     "year": 1900,
//     "country": "Georgia"
// }];


app.get('/', (req, res, next) => {
    res.send(getUsers());
});

app.get('/:id', (req, res, next) => {
   res.send(getUsersById(req.params.id));
    
});

app.post('/', (req, res, next) => {
    let rec = req.body;
    addUsers(rec);
    res.send({status: 'ok', msf: 'added success'});
});

app.put('/', (req, res, next) => {
    const rec = req.body;
    updateUsers(rec);
    
    res.send({status: 'ok', msg: 'update success'});
});

app.delete('/', (req, res, next) => {
    deleteUsers(req.body.id);
    res.send({result:'ok',msg:'record deleted successfully'});
});


module.exports = app;