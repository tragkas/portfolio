const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('./database');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login Endpoint
const login = (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result) {
                const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ token, username: user.username });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        });
    });
};

// Change Credentials Endpoint
const updateCredentials = (req, res) => {
    const { oldPassword, newUsername, newPassword } = req.body;
    const userId = req.user.id;

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });

        bcrypt.compare(oldPassword, user.password_hash, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!result) return res.status(401).json({ error: "Incorrect old password" });

            const saltRounds = 10;
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) return res.status(500).json({ error: err.message });

                db.run("UPDATE users SET username = ?, password_hash = ? WHERE id = ?", [newUsername, hash, userId], (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: "Credentials updated successfully" });
                });
            });
        });
    });
};

module.exports = {
    authenticateToken,
    login,
    updateCredentials
};
