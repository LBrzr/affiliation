const User = require('../models/user');

const orderController = async (req, res) => {
    try {
        const { price } = req.params;
        const { godFatherId } = req.cookies;
        console.log(godFatherId);
        if (godFatherId) {
            const godFather = await User.findById(godFatherId).select('+balance');
            if (godFather) {
                godFather.balance += price * 0.1;
                await godFather.save();
                console.log("Add godfather percentage");
            }
        }
        console.log({ message: 'Order created' });
        return res.redirect(process.env.ON_AFTER_ORDER_REDIRECT_URL);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

module.exports = {
    orderController,
};