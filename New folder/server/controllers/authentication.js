const User = require('../models/user');
const { hashPassword, generateSalt } = require('../helpers');

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = generateSalt();
        const user = new User({
            name,
            email,
            authentication: {
                password: hashPassword(salt, password),
                salt,
            },
        });

        const savedUser = await user.save();
        return res.status(200).json(savedUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email }).select('+authentication.password +authentication.salt');

        if (!existingUser) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const hashedPassword = hashPassword(existingUser.authentication.salt, password);
        if (existingUser.authentication.password !== hashedPassword) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const salt = generateSalt();
        existingUser.authentication.token = hashPassword(salt, existingUser._id.toString());

        await existingUser.save();

        res.cookie('token', existingUser.authentication.token, { domain: 'localhost', path: '/' });
        return res.status(200).json(existingUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

const meController = (req, res) => {
    try {
        const { user } = req;
        console.log(user.name, ' retrieved');
        return res.json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports = {
    registerController,
    loginController,
    meController,
};