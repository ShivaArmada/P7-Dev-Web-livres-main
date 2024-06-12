/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */


const express = require('express');
const booksRouter = express.Router();
//on en a pas besoin pour le moment c'est pour l'upload d'images eventuellements
// const multer = require('../Middleware/multer-config');
// const auth = require('../Middleware/authentificate');

const Book = require('../models/Book');
const { API_ROUTES } = require('../src/utils/constants');
const Booksctrl = require('../controllers/Books');

function getRelativePath(fullUrl) {
  const url = new URL(fullUrl);
  return url.pathname;
}

booksRouter.get(getRelativePath(API_ROUTES.BOOKS), /*auth, multer,*/ Booksctrl.getBooks);
booksRouter.get(getRelativePath(API_ROUTES.BEST_RATED), /*auth, multer,*/ Booksctrl.getBestRated);




module.exports = booksRouter;