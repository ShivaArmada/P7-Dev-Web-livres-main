/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */


const express = require('express');
const booksRoute = express.Router();
//on en a pas besoin pour le moment c'est pour l'upload d'images eventuellements
// const multer = require('../Middleware/multer-config');
// const auth = require('../Middleware/authentificate');

const Book = require('../models/Book');
const { API_ROUTES } = require('../src/utils/constants');

function getRelativePath(fullUrl) {
  const url = new URL(fullUrl);
  return url.pathname;
}

booksRoute.get(getRelativePath(API_ROUTES.BOOKS), async (req, res) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(err => res.status(400).json('Error: ' + err));
});

booksRoute.get(getRelativePath(API_ROUTES.BEST_RATED), (req, res) => {
  Book.find({ rating: { $in: [4, 5] } }).sort({ rating: -1 }).limit(5)
    .then(books => res.status(200).json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});


// ça devrais donner un truc du genre
// const Booksctrl = require('../controllers/Books');
// router.get('/books', auth, multer, Booksctrl.getBooks);
// router.get('/books/bestRated', auth, multer, Booksctrl.getBestRated);

module.exports = booksRoute;