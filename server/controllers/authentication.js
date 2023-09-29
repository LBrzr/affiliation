import express from 'express';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // Check for existing user
        const existingUser = await User
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}