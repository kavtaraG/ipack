const express = require('express');
const app = express.Router();

var store = [
    {id: 1, name: 'Domestos', origin: 'Turkey', items: '5', price: '6.0 GEL', quantity: '5'}
];

app.get('/', (req, res, next) => {
    res.send(store);
});


app.get('/:id', (req, res, next) => {
    let rec = store.filter((id) => (id, req.params.id));
    if(rec.length > 0){
        res.send(rec[0]);
    }else{
        res.send({});
    };
});

app.post('/', (req, res, next) => {
    let rec = req.body;
    rec.id = Date.now();
    store.push(rec);
    res.send({status: 'ok', msg: 'post success'});
});

app.put('/', (req, res, next) => {
    let rec = req.body;
    store.map((item, index) => {
        if(rec.id == item.id){
            store[index] = rec;
        }
        res.send({status: 'ok', msg: 'update success'});
    })
});


app.delete('/', (req, res, next) => {
    let rec = req.body.id;
    let temp = store.filter((id) => (id.id != rec));
    rec = temp;
    res.send({status: 'ok', msg: 'delete success'});
});



module.exports = app;