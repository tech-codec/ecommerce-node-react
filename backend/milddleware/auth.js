// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).send("Token is required!");

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token!");

        req.user = decoded;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('roles');
    if (user && user.roles.some(role => role.name === 'admin')) {
        next();
    } else {
        return res.status(403).send("Admin access required!");
    }
};
