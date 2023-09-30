const crypto = require('crypto');

const generateSalt = ({ size = 16 }) => crypto.randomBytes(size).toString('hex');
const hashPassword = (salt, password) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

const generateAffiliationCode = (userId) => {
    const salt = generateSalt({ size: 8 });
    return crypto.pbkdf2Sync(userId, salt, 100, 128, 'sha512').toString('hex');
}

const affiliationLinkBaseUrl = 'http://localhost:8000/affiliation';

const generateAffiliationLink = (userId) => {
    return `${affiliationLinkBaseUrl}/${generateAffiliationCode(userId)}`;
}

module.exports = { generateSalt, hashPassword, generateAffiliationLink, affiliationLinkBaseUrl };