const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name must be a string'],
        trim: true
    },

    origin: {
        type: String,
        require: [true, 'name must be a string'],
        trim: true
    },

    items: {
        type: Number,
        require: [true, 'name must be a number'],
    },

    price: {
        type: Number
    },

    quantity: {
        type: Number
    },
    imageCover: {
        type: String,
        require: [true, 'name must be a string'],
    },
    createdAt: {
        type: Date,
    },
    
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;