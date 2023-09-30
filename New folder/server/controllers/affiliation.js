const User = require('../models/user');
const AffiliationLink = require('../models/affiliation_link');
const AffiliationVote = require('../models/affiliation_vote');
const { affiliationLinkBaseUrl } = require('../helpers');

const affiliationController = async (req, res) => {
    try {
        const { code } = req.params;
        const link = await AffiliationLink.findOne({ url: `${affiliationLinkBaseUrl}/${code}` }).select('+user._id');

        if (!link) {
            return res.status(400).json({ message: 'Invalid affiliation link' });
        }
        res.cookie('godFatherId', link.user._id, { domain: 'localhost', path: '/' });
        return res.redirect('http://localhost:3000/product');
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports = {
    affiliationController,
};