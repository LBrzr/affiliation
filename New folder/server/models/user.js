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
    authentication: {
        type: AutenticationSchema,
    },
    godFather: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('User', UserSchema);