const mongoose = require('mongoose');

/*eslint-disable*/

// Définition du schéma de la collection "books"
const bookSchema = new mongoose.Schema({
    // Définir les propriétés de votre modèle ici
});

// Création du modèle "Book" à partir du schéma
const Book = mongoose.model('Book', bookSchema);

// Export du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Book;
