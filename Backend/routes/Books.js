/*eslint-disable*/

/* les routes sont pour gerer comme en front le contexte d'utilisation des requetes http */

//const { uploadImage, optimizeImage } = require("../Middleware/multer-config");
//const authenticateToken = require("../Middleware/authenticate.js");
const BooksCtrl = require("../controllers/Books.js");

console.log(BooksCtrl.getBook); // test



async function BooksGetAll (req, res) {

  return await  BooksCtrl.getBooks (req, res);
    
    
}

//.post(authenticateToken, uploadImage, optimizeImage, BooksCtrl.createBook);
/*booksRouter
  .route(`/:id`)
  .get(BooksCtrl.getBook)
  .put(authenticateToken, uploadImage, optimizeImage, BooksCtrl.modifyBook)
  .delete(authenticateToken, BooksCtrl.deleteBook);

booksRouter
  .route(`/:id/rating`)
  .post(authenticateToken, BooksCtrl.createRating);

booksRouter.get("/bestRating", BooksCtrl.getBestRating);*/
module.exports = {BooksGetAll};

