const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be a string'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password must be a string'],
        trim: true
    },
    firstname: {
        type: String,
        requiredd: [true, 'fisrt name must be a stroing'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'last name must be a string'],
        trim: true
    },
    day: {
        type: Number,
        required: [true, 'day must to be  a number'],
    },
    mounth: {
        type: Number,
        required: [true, 'mounth must to be a numnber'],
    },
    year: {
        type: Number,
        required: [true, 'year must to be a number'],
    },
    country: {
        type: String,
        required: [true, 'country must to be  string'],
        trim: true
    },
    createdAt: {
        type: Date,
        required: [Date.now()]
    }
});

const Users = mongoose.model('Users', userSchema);

// const newUsers = new Users({
//     username: '2pac',
//     password: '132432',
//     firstname: 'aasd',
//     lastname: 'ddd',
//     day: 2,
//     mounth: 4,
//     year: 1234,
//     country: 'Georgia'
// });

// newUsers.save().then((doc) => {
//     console.log(doc);
// }).catch((err) => {
//     console.log(`Error: ${err}`);
// });

module.exports = Users;