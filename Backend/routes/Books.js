/*eslint-disable*/
const express = require('express');
const booksRoute = express.Router();

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

module.exports = booksRoute;