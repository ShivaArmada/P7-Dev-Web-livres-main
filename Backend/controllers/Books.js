/*eslint-disable*/
import Book from "../models/Book";
import handleError from "./User";
const { getBooks, getBestRatedBooks } = require('../../src/lib/common');



exports.getBooks = async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.getBestRatedBooks = async (req, res) => {
    try {
        const books = await getBestRatedBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return handleError(res, "Erreur :", err);
  }
};

/*les controleurs sont la logique de l'app, ils vont permettre de faire des actions sur les données */

