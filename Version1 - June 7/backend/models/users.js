const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userSchema = new schema ({
    name : String,
    email : String,
    phone : String,
    password :String,
    books: Array
});

module.exports = mongoose.model('users', userSchema);