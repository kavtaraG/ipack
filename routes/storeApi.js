const express = require('express');
const app = express.Router();
//const {getStore, getStoreById, postStore, putStore, deleteStore} = require('../controllers/storeData');
const { getStore, getStoreById, addStore, updateStore, deleteStore } = require('../controllers/store-mongo');


app.get('/', async(req, res, next) => {
    res.send(await getStore(req.body));
});


app.get('/:id', async (req, res, next) => {
    res.send(await getStoreById(req.params.id));
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