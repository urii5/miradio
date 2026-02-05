const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    // In production, registration might be disabled or protected
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    User.create(username, email, password, 'admin', (err, user) => {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).send({ message: "Username or email already exists" });
            }
            return res.status(500).send({ message: "Error registering user" });
        }
        res.status(201).send({ message: "User registered successfully" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send({ message: "Server error" });
        if (!user) return res.status(404).send({ message: "User not found" });

        User.verifyPassword(password, user.password_hash, (err, isMatch) => {
            if (err) return res.status(500).send({ message: "Server error" });
            if (!isMatch) return res.status(401).send({ message: "Invalid password" });

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken: token
            });
        });
    });
};

exports.me = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send({ message: "Server error" });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.json(user);
    });
};
