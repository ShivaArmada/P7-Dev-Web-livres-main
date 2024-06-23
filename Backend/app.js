/* eslint-disable */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
//const { signIn, signUp } = require("./routes/User.routes");
//const { BooksGetAll, BooksGetOne } = require("./routes/Books.routes");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
/*app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);*/

//app.use(limiter); // Apply to all requests
app.use(express.urlencoded({ extended: true })); // Pour analyser les corps de requête des formulaires HTML
app.use(express.json()); // Pour analyser les corps de requête au format JSON

//coté books

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/books", require("./routes/Books.routes"));
//app.get("/api/books", BooksGetAll);
//app.get("/api/books/:id", BooksGetOne);

/*app.post("/api/books", BooksCreate);
app.get("/api/books/bestRating", getBestRating);
app.post("/api/books/:id/rating", createRating);
app.put("/api/books/:id", modifyBook);
app.delete("/api/books/:id", deleteBook);*/

//coté sign up et sign in

//ou bien

app.use("/api/auth", require("./routes/User.routes"));

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

module.exports = app;
