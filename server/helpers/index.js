const crypto = require('crypto');

const generateSalt = () => crypto.randomBytes(16).toString('hex');
const hashPassword = (salt, password) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

module.exports = { generateSalt, hashPassword };