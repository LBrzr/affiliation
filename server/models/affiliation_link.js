const mongoose = require('mongoose');

const AffiliationLinkSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('AffiliationLink', AffiliationLinkSchema);