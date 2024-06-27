/*eslint-disable*/
const bcrypt = require("bcrypt");
const User = require("../models/User.Data");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
};

const handleError = (res, errorMessage, consoleMessage, statusCode = 500) => {
    console.error(consoleMessage);
    return res.status(statusCode).json({ error: errorMessage });
};

module.exports = {
    handleError,
    signUp: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            await user.save();
            res.status(201).json({ message: "Utilisateur créé !" });
        } catch (error) {
            handleError(res, "Erreur lors de la création de l'utilisateur", error.message, 400);
        }
    },
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return handleError(res, "Utilisateur non trouvé !", "Tentative de connexion échouée, email non reconnu", 401);
            }
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                return handleError(res, "Mot de passe incorrect !", "Tentative de connexion échouée, mot de passe incorrect", 401);
            }
            const token = generateToken(user._id);
            res.status(200).json({
                userId: user._id,
                token,
            });
        } catch (error) {
            handleError(res, "Erreur lors de la connexion", error.message);
        }
    }
};