const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/login');

connect.then(() => {
    console.log('Connected to the database successfully');
}, (err) => {
    console.log('Connection failed with error: ' + err);
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;