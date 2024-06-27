/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */

const express = require("express");
const BooksRouter = express.Router();

const multer = require("../Middleware/multer-config.js");
const authenticateToken = require("../Middleware/authenticate.js");
const BooksCtrl = require("../controllers/Books.Ctrl.js");

//L'autoroute à plusieurs voies de nos requetes books
BooksRouter.get("/", BooksCtrl.getBooks);
BooksRouter.get("/bestrating", BooksCtrl.getBestRating);
BooksRouter.get("/:id", BooksCtrl.getBook);
BooksRouter.post("/", authenticateToken, multer, multer.optimizeImage, BooksCtrl.createBook);
BooksRouter.post("/:id/rating", authenticateToken, BooksCtrl.createRating);
BooksRouter.put("/:id", authenticateToken, multer, multer.optimizeImage, BooksCtrl.modifyBook);
BooksRouter.delete("/:id", authenticateToken, BooksCtrl.deleteBook);


module.exports = BooksRouter; 

