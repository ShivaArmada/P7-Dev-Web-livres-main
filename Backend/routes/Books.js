/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */


const express = require('express');
const booksRouter = express.Router();
 const multer = require('../Middleware/multer-config');
 const auth = require('../Middleware/authentificate');

const { API_ROUTES } = require('../src/utils/constants');
const BooksCtrl = require('../controllers/Books');



// Remove the base URL from the API routes
const BOOKS = API_ROUTES.BOOKS.replace(API_ROUTES.API_URL, '');
const BEST_RATED = API_ROUTES.BEST_RATED.replace(API_ROUTES.API_URL, '');

booksRouter.route(BOOKS)
  .get(BooksCtrl.getAllBooks)
  .post(auth, multer, multer.optimizeImage, BooksCtrl.createBook);

booksRouter.route(`${BOOKS}/:id`)
  .get(BooksCtrl.getOneBook)
  .put(auth, multer, multer.optimizeImage, BooksCtrl.modifyBook)
  .delete(auth, BooksCtrl.deleteBook);

booksRouter.route(`${BOOKS}/:id/rating`)
  .post(auth, BooksCtrl.createRating);

booksRouter.get(BEST_RATED, BooksCtrl.getBestRating);



module.exports = booksRouter;