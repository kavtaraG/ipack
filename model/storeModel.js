const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String
    },

    origin: {
        type: String
    },

    items: {
        type: String
    },

    price: {
        type: String
    },

    quantity: {
        type: String
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;