const mongoose = require('mongoose');

const AutenticationSchema = new mongoose.Schema({
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
    token: {
        type: String,
    },
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
    },
    authentication: {
        type: AutenticationSchema,
    },
});

module.exports = mongoose.model('User', UserSchema);