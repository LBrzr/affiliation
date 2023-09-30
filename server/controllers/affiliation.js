const AffiliationLink = require('../models/affiliation_link');

const affiliationController = async (req, res) => {
    try {
        // get link code from params
        const { code } = req.params;
        // find link by code
        const link = await AffiliationLink.findById(code).select('+user._id');
        if (!link) {
            return res.status(400).json({ message: 'Invalid affiliation link' });
        }
        // set cookie with godFatherId
        res.cookie('godFatherId', link.user._id, { domain: 'localhost', path: '/' });
        // redirect to product page
        return res.redirect(process.env.ON_AFTER_AFFILIATION_LINK_REDIRECT_URL);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports = {
    affiliationController,
};