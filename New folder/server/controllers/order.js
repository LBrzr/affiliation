const User = require('../models/user');

const orderController = async (req, res) => {
    try {
        const { godFatherId } = req.cookies;
        console.log(godFatherId);
        if (godFatherId) {
            const godFather = await User.findById(godFatherId);
            if (godFather) {
                console.log("Add godfather percentage");
            }
        }
        return res.status(200).json({ message: 'Order created' }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

module.exports = {
    orderController,
};