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
        // Generate salt and hash password
        const salt = generateSalt();
        const user = new User({
            name,
            email,
            authentication: {
                password: hashPassword(salt, password),
                salt,
            },
        });

        // Save user
        const savedUser = await user.save();
        return res.status(200).json(savedUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

const loginController = async (req, res) => {
    try {
        // get email and password from body
        const { email, password } = req.body;
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // Check for existing user
        const existingUser = await User.findOne({ email }).select('+authentication.password +authentication.salt');
        // Check if user exists
        if (!existingUser) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }
        // Check password
        const hashedPassword = hashPassword(existingUser.authentication.salt, password);
        if (existingUser.authentication.password !== hashedPassword) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }
        // Generate token and save user
        const salt = generateSalt();
        existingUser.authentication.token = hashPassword(salt, existingUser._id.toString());
        await existingUser.save();
        // Set cookie with token
        res.cookie('token', existingUser.authentication.token, { domain: 'localhost', path: '/' });
        return res.status(200).json(existingUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

const meController = (req, res) => {
    try {
        // get user from req
        const { user } = req;
        console.log(user.name, ' retrieved');
        // return authenticated user
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