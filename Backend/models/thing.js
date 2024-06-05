/*eslint-disable*/
const mongoose = require('mongoose');



// Définition du schéma de la collection "things"
const thingSchema = new mongoose.Schema({
    // Définir les propriétés de votre modèle ici
});

// Création du modèle "Thing" à partir du schéma
const Thing = mongoose.model('Thing', thingSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Thing;