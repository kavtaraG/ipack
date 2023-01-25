const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be a string'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be a string']
    },
    firstname: {
        type: String,
        requiredd: [true, 'fisrt name must be a stroing']
    },
    lastname: {
        type: String,
        required: [true, 'last name must be a string']
    },
    day: {
        type: String,
        required: [true, 'day must to be  a number']
    },
    mounth: {
        type: String,
        required: [true, 'mounth must to be a numnber']
    },
    year: {
        type: Number,
        required: [true, 'year must to be a number']
    },
    country: {
        type: String,
        required: [true, 'country must to be  string']
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;