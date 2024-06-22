/* eslint-disable */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { signIn, signUp } = require("./routes/User");
const { BooksGetAll, BooksCreate, BooksGetOne, getBestRating, createRating, modifyBook, deleteBook } = require("./routes/Books");



const app = express();
app.use(express.json());



mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par windowMs
});*/

// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
/*app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);*/

//app.use(limiter); // Apply to all requests

// Use the routes
//app.use("/images", express.static(path.join(__dirname, "images")));
//app.use(API_ROUTES.SIGN_UP, require("./routes/User"));
//app.use(API_ROUTES.SIGN_IN, require("./routes/User"));
app.get("/api/books", BooksGetAll);
app.get("/api/books/:id", BooksGetOne);
app.post("/api/books", BooksCreate);
app.get("/api/books/bestRating", getBestRating);
app.post("/api/books/:id/rating", createRating);
app.put("/api/books/:id", modifyBook);
app.delete("/api/books/:id", deleteBook);
//app.use(API_ROUTES.BEST_RATED, require("./routes/Books"));

//coté sign up et sign in

app.post("/api/signup", signUp);
app.post("/api/login", signIn);




//models => les schemas pour la base de données
const Book = require("./models/Book");
const { sign } = require("crypto");
const User = require("./models/UserUp");

/*const data = require("../public/data/data.json");

Book.insertMany(data)
  .then(() => console.log("Data sauvegardée :)) "))
  .catch((err) => console.log("Data non sauvegardée :'(", err));

Book.deleteMany({})
  .then(() => console.log("Toutes les données ont été supprimées."))
  .catch((err) => console.log("Erreur lors de la suppression des données :", err));  
*/


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

module.exports = app;
