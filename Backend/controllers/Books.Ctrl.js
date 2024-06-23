/*eslint-disable*/
const Book = require("../models/Books.Data"); // Corrected model import path
const handleError = require("./User.ctrl");
const fs = require("fs");

exports.getBooks = async (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error })); // Simplified error handling
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3) // Changed limit to 3 as per example
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error })); // Simplified error handling
};

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${req.file.filename}`,
    averageRating: bookObject.ratings[0].grade, // Initialized averageRating
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => res.status(400).json({ error })); // Simplified error handling
};

exports.getBook = async (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error })); // Simplified error handling and renamed from getOneBook for consistency
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/resized_${req.file.filename}`,
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
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error })); // Simplified error handling
      }
    })
    .catch((error) => res.status(404).json({ error })); // Simplified error handling
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
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error })); // Simplified error handling
        });
      }
    })
    .catch((error) => res.status(404).json({ error })); // Simplified error handling
};

exports.createRating = async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "La note doit être comprise entre 1 et 5" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    const userIdArray = book.ratings.map((rating) => rating.userId);
    if (userIdArray.includes(req.auth.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    book.ratings.push({ ...req.body, grade: rating });

    const totalGrades = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
    book.averageRating = (totalGrades / book.ratings.length).toFixed(1);

    await book.save();
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la création de la notation" }); // Simplified error handling
  }
};
