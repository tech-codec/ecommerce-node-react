// controllers/authController.js

const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {registerErrors, loginErrors} = require('../utils/errors.util')

const SALT_WORK_FACTOR = 10;

const maxAge = 3 *21 *60 *1000
// const createToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET, {
//         expiresIn:maxAge
//     })
// }


// Inscription
exports.register = async (req, res) => {
    const { name, email, bio, password, roles } = req.body;

    try {
        // Création de l'utilisateur
        const newUser = new User({ name, email, bio, password, roles });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        const errors = registerErrors(error)
        res.status(500).send({errors});
    }
};


// Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email,password);
        const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Stockage du token dans un cookie
        res.cookie('token', token, { httpOnly: true, maxAge:maxAge });
        res.json({ message: 'Connexion réussie', user });
    } catch (error) {
        const errors = loginErrors(error)
        res.status(500).send({errors});
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Déconnecté avec succès' });
};


