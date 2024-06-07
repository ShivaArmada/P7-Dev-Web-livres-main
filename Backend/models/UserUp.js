/*eslint-disable */
const mongoose = require('mongoose');

// Définition du schéma de la collection "users"
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Création du modèle "UserUp" à partir du schéma
const UserUp = mongoose.model('UserUp', userSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = UserUp;