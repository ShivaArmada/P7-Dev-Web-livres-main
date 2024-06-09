/*eslint-disable*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserUp');
const API_ROUTES = require('../../src/utils/constants'); // Assurez-vous que le chemin vers apiRoutes.js est correct
const saltRounds = 10;

userCtrl = require('../controllers/User');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
}

const handleError = (res, errorMessage, consoleMessage, statusCode = 500) => {
    console.error(consoleMessage);
    return res.status(statusCode).json({ error: errorMessage });
}

router.post(API_ROUTES.SIGN_UP, async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const hash = await bcrypt.hash(motDePasse, saltRounds);
        const newUser = new User({ email, motDePasse: hash });

        const user = await newUser.save();
        const token = generateToken(user._id); // Passer l'ID de l'utilisateur à generateToken

        res.status(201).json({
            message: "Bienvenue sur MonVieuxGrimoire! Votre inscription a été réussie.",
            token,
        });
    } catch (err) {
        return handleError(res, 'Erreur lors de l\'enregistrement de l\'utilisateur', 'Erreur lors de l\'enregistrement de l\'utilisateur :', err);
    }
});

router.post(API_ROUTES.SIGN_IN, async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return handleError(res, 'Utilisateur non trouvé', 'Utilisateur non trouvé', 404);
        }

        const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);

        if (isMatch) {
            const token = generateToken(user._id);
            res.status(200).json({
                message: "Connexion réussie",
                token,
            });
        } else {
            res.status(401).json({ error: 'Email/Mot de passe incorrect' });
        }
    } catch (err) {
        return handleError(res, 'Erreur lors de la recherche de l\'utilisateur', 'Erreur lors de la recherche de l\'utilisateur :', err);
    }
});


//une fois tout ranger dans controllers en deux fonctions, ça donne
//router.post(API_ROUTES.SIGN_UP, userCtrl.signUp);
//router.post(API_ROUTES.SIGN_IN, userCtrl.signIn);

module.exports = router;