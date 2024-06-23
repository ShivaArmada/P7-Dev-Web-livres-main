/*eslint-disable*/

const Book = require("../models/Book");
const handleError = require("./User");
const fs = require("fs");

exports.getBooks = async (req, res) => {
  Book.find()
  .then((books) => res.status(200).json(books))
  .catch((error) => handleError(res, "Impossible de récupérer les livres", error.message, 404));
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(5)
    .then((books) => res.status(200).json(books))
    .catch((error) => handleError(res, "Erreur lors de la récupération des meilleurs notations", error.message, 404));
};

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${
      req.file.filename
    }`,
    //reset rating
    averageRating: bookObject.ratings[0].grade,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      handleError(res, "Erreur lors de la création du livre", error.message, 400);
    });
};

exports.getBook = async (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => handleError(res, "Livre non trouvé", error.message, 404));
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "403: unauthorized request" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        req.file &&
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
          });
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => handleError(res, "Erreur lors de la modification du livre", error.message, 400));
      }
    })
    .catch((error) => {
      handleError(res, "Livre non trouvé pour modification", error.message, 404);
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "403: unauthorized request" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => handleError(res, "Erreur lors de la suppression du livre", error.message, 400));
        });
      }
    })
    .catch((error) => {
      handleError(res, "Livre non trouvé pour suppression", error.message, 404);
    });
};

exports.createRating = async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
      return handleError(res, "La note doit être comprise entre 1 et 5", "Note invalide", 400);
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return handleError(res, "Livre non trouvé", "Tentative de notation d'un livre inexistant", 404);
    }

    const userIdArray = book.ratings.map((rating) => rating.userId);
    if (userIdArray.includes(req.auth.userId)) {
      return handleError(res, "Non autorisé", "Tentative de notation multiple par le même utilisateur", 403);
    }

    book.ratings.push({ ...req.body, grade: rating });

    // Calcul de la moyenne manuellement
    const totalGrades = book.ratings.reduce(
      (sum, rating) => sum + rating.grade,
      0
    );
    book.averageRating = (totalGrades / book.ratings.length).toFixed(1);

    await book.save();
    return res.status(201).json(book);
  } catch (error) {
    return handleError(res, "Erreur lors de la création de la notation", error.message, 500);
  }
};