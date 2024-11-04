const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const transporter = require('../utils/nodemailer');
const { JWT_SECRET, CLIENT_URL } = require('../config/config');

exports.register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1d' });
        const url = `${CLIENT_URL}/activate/${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Account Activation',
            template: 'activate',
            context: { name, url }
        });

        res.status(201).json({ message: 'User registered. Activation email sent.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, bio, password, roles, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ errors: [{ msg: 'Les mots de passe ne correspondent pas' }] });
    }

    try {
        // Création de l'utilisateur
        const newUser = new User({ name, email, bio, password, roles });
        await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1d' });
        const url = `${CLIENT_URL}/activate/${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Account Activation',
            template: 'activate',
            context: { name, url }
        });

        res.status(201).json({ message: "Utilisateur enregistré. E-mail d'activation envoyé." });
    } catch (error) {
        const errors = registerErrors(error)
        res.status(500).send({errors});
    }
};

exports.activateAccount = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        user.isActive = true;
        await user.save();
        res.status(200).json({ message: 'Account activated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        if (!user.isActive) {
            return res.status(400).json({ error: 'Account not activated' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email,password);
        const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // Stockage du token dans un cookie
        res.cookie('token', token, { httpOnly: true, maxAge:maxAge });
        res.json({ message: 'Connexion réussie', user });
    } catch (error) {
        const errors = loginErrors(error)
        res.status(500).send({errors});
    }
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User with this email does not exist' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const url = `${CLIENT_URL}/reset-password/${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            template: 'reset',
            context: { name: user.name, url }
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config({path:'../config/.env'})


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: path.resolve(__dirname, '../views/email/'),
        defaultLayout: 'template',
    },
    viewPath: path.resolve(__dirname, '../views/email/'),
    extName: '.hbs'
}));

module.exports = transporter;





