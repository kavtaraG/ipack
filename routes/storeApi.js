const express = require('express');
const app = express.Router();
const {getStore, getStoreById, postStore, putStore, deleteStore} = require('../controllers/storeData');



app.get('/', (req, res, next) => {
    res.send(getStore());
});


app.get('/:id', (req, res, next) => {
    res.send(getStoreById(req.params.id));
    // let rec = store.filter((id) => (id, req.params.id));
    // if(rec.length > 0){
    //     res.send(rec[0]);
    // }else{
    //     res.send({});
    // };
});

app.post('/', (req, res, next) => {
    res.send(postStore(req.body));
    // let rec = req.body;
    // rec.id = Date.now();
    // store.push(rec);
    res.send({status: 'ok', msg: 'post success'});
});

app.put('/', (req, res, next) => {
    res.send(putStore(req.body));
    // let rec = req.body;
    // store.map((item, index) => {
    //     if(rec.id == item.id){
    //         store[index] = rec;
    //     };
    //     res.send({status: 'ok', msg: 'update success'});
    // });
});


app.delete('/', (req, res, next) => {
    res.send(deleteStore(req.body.id));
    // let rec = req.body.id;
    // let temp = store.filter((id) => (id.id != rec));
    // rec = temp;
    res.send({status: 'ok', msg: 'delete success'});
});



module.exports = app;