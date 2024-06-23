/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */

const express = require("express");
const BooksRouter = express.Router();

//const multer = require("../Middleware/multer-config.js");
const authenticateToken = require("../Middleware/authenticate.js");
const BooksCtrl = require("../controllers/Books.js");
const { getBooks, getBook } = require("../controllers/Books.js");



async function BooksGetAll(req, res) {
  return await BooksCtrl.getBooks(req, res);
}

async function BooksGetOne(req, res) {
  return await BooksCtrl.getBook(req, res);
}

module.exports = {
  BooksGetAll,
  BooksGetOne
};


/*BooksRouter.get("/api/books", BooksCtrl.getBooks.bind(BooksCtrl));
BooksRouter.get("/api/books/:id", BooksCtrl.getBook.bind(BooksCtrl));*/
BooksRouter.get("/bestrating", BooksCtrl.getBestRating);
//BooksRouter.post("/", authenticateToken, multer, multer.optimizeImage, BooksCtrl.createBook);
BooksRouter.post("/:id/rating", authenticateToken, BooksCtrl.createRating);
//BooksRouter.put("/:id", authenticateToken, multer, multer.optimizeImage, BooksCtrl.modifyBook);
BooksRouter.delete("/:id", authenticateToken, BooksCtrl.deleteBook);


module.exports = BooksRouter; 

