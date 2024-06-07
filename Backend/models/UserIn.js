const mongoose = require('mongoose');

/*eslint-disable*/

// Définition du schéma de la collection "users"
const userSchema = new mongoose.Schema({
    // Définir les propriétés de votre modèle ici
});

// Création du modèle "UserIn" à partir du schéma
const UserIn = mongoose.model('UserIn', userSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = UserIn;
