/*eslint-disable */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma de la collection "users"
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    motDePasse: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

// Création du modèle "UserUp" à partir du schéma
const UserUp = mongoose.model('UserUp', userSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = UserUp;
