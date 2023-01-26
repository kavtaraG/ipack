const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, 
    (err, client) => {
        if(err) throw err;

        var db = client.db('users');
        db.collection('users').find().toArray((err, result) => {
            if(err) throw err;
            console.log(result);
        });
    });