// controllers/authController.js

const User = require('../models/User')
//const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const transporter = require('../utils/nodemailer');

const {registerErrors, loginErrors} = require('../utils/errors.util');
const Role = require('../models/Role');

//const SALT_WORK_FACTOR = 10;

//const maxAge = 3 *21 *60 *1000
//const maxAge = 72 *60 *60 *1000 //72h donc 3d
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours en millisecondes
// const createToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET, {
//         expiresIn:maxAge
//     })
// }


// Inscription
exports.register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(500).json({ confirmPassword: 'Les mots de passe ne correspondent pas' });
    }

    try {
        // Création de l'utilisateur
        const newUser = new User({ name, email,password});
        const role = await Role.findOne({ name: "client" });
        newUser.roles.push(role)
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const url = `${process.env.CLIENT_URL}/activate/${token}`;
        console.log("mon url de connexion: "+url+"\n")
        console.log("mon token : "+token)

        await transporter.sendMail({
            from:{
                name:process.env.NAME_USER,
                address:process.env.EMAIL_USER
            },
            to: email,
            subject: 'Activation du compte',
            template: 'activate',
            context: { name, url }
        });
        

        res.status(201).json({ message: "Votre compte a été créé avec succès et un mail d'activation de compte vous a été envoyé à  "+email });
    } catch (error) {
        const erros = registerErrors(error)
        res.status(500).json(erros);
    }
};



// Inscription
exports.adminRegister = async (req, res) => {
    const { name, email, roles, password, confirmPassword } = req.body;

    if (roles.length === 0) {
        return res.status(500).json({ rolesError: 'vous devez choisir au-moins un rôle !' });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(500).json({ confirmPassword: 'Les mots de passe ne correspondent pas' });
    }

    try {
        // Création de l'utilisateur
        const newUser = new User({ name, email,password,roles});
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const url = `${process.env.ADMIN_URL}/activate/${token}`;
        console.log("mon url de connexion: "+url+"\n")
        console.log("mon token : "+token)

        await transporter.sendMail({
            from:{
                name:process.env.NAME_USER,
                address:process.env.EMAIL_USER
            },
            to: email,
            subject: 'Activation du compte',
            template: 'activate',
            context: { name, url }
        });
        

        res.status(201).json({ message: "Votre compte a été créé avec succès et un mail d'activation de compte vous a été envoyé à  "+email });
    } catch (error) {
        const erros = registerErrors(error)
        res.status(500).json(erros);
    }
};



// Connexion
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.login(email,password);
//         const token = jwt.sign({ id: user._id, roles: user.roles}, process.env.JWT_SECRET, { expiresIn: '3d' });

//         // Stockage du token dans un cookie
//         res.cookie('token', token, { 
//             httpOnly: true, 
//             maxAge:maxAge, 
//             sameSite: 'strict', // To prevent CSRF 
//         });
//         // // Store the token in a cookie
//         // res.cookie('token', token, {
//         //     httpOnly: true,
//         //     secure: process.env.NODE_ENV === 'production', // Set secure flag in production
//         //     maxAge,
//         //     sameSite: 'strict', // To prevent CSRF
//         // });
//         res.json({ message: 'Connexion réussie', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        // Création du token JWT
        const token = jwt.sign(
            { id: user._id, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '3d' } // Expire en 3 jours
        );

        // Configuration du cookie
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', //Secure en production
            maxAge: maxAge, 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',  //Protection contre CSRF
        });

        res.status(200).json({
            message: "Connexion réussie",
            user: { id: user._id, email: user.email, roles: user.roles }
        });

    } catch (error) {
        console.error("Erreur de connexion :", error);
        res.status(500).json({ error: "Une erreur interne est survenue" });
    }
};



exports.activateAccount = async (req, res) => {
    const { token } = req.params;
    console.log('le token de vérification: ', token)
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ error: 'Le token est invalide' });
        }
        user.isActive = true;
        await user.save();
        res.status(200).json({ message: 'Votre compte a été activé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log("cette email: "+email)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "L'utilisateur avec cet e-mail n'existe pas" });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const url = `${process.env.CLIENT_URL}/reset-password/${token}`;

        await transporter.sendMail({
            from:{
                name:process.env.NAME_USER,
                address:process.env.EMAIL_USER
            },
            to: email,
            subject: 'Réinitialisation du mot de passe',
            template: 'reset',
            context: { name: user.name, url }
        });

        res.status(200).json({ message: 'E-mail de réinitialisation du mot de passe envoyé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.adminRequestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log("cette email: "+email)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "L'utilisateur avec cet e-mail n'existe pas" });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const url = `${process.env.ADMIN_URL}/reset-password/${token}`;

        await transporter.sendMail({
            from:{
                name:process.env.NAME_USER,
                address:process.env.EMAIL_USER
            },
            to: email,
            subject: 'Réinitialisation du mot de passe',
            template: 'reset',
            context: { name: user.name, url }
        });

        res.status(200).json({ message: 'E-mail de réinitialisation du mot de passe envoyé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ passwordLength: "Le mot de passe doit avoir au mois 6 caractères" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ confirmPasswordError: "Les mots de passe ne correspondent pas" });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ jetonError: 'Jeton invalide ou expiré vous devez clicker à nouveau sur mot de passe oublier' });
        }

        // const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // user.password = await bcrypt.hash(password, salt);
        user.password = password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Réinitialisation du mot de passe réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        secure: process.env.NODE_ENV === 'production', //Supprimer correctement en HTTPS
    });
    return res.status(200).json({ message: 'Déconnecté avec succès' });
};


