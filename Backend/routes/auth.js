const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hash });

        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, name: newUser.name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
