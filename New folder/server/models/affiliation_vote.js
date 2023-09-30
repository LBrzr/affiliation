const mongoose = require('mongoose');

const AffiliationVoteSchema = new mongoose.Schema({
    affiliationLink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AffiliationLink',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AffiliationVote', AffiliationVoteSchema);