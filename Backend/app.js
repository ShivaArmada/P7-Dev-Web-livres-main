/* eslint-disable */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// En étant sur 4000, écoute et répond aux requêtes de notre front = 3000
app.use(cors({ origin: "http://localhost:3000" }));

// Helmet permet de sécuriser le site de certaines vulnérabilités (iframe du site, en-têtes HTTP, etc.) là config CORP : false pour multer
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// headers
app.use(express.urlencoded({ extended: true })); // Pour analyser les corps de requête
app.use(express.json()); // Pour analyser les corps de requête au format JSON

//afin de fournir les images du dossier images
app.use("/images", express.static(path.join(__dirname, "../images")));

//route principale des livres
app.use("/api/books", require("./routes/Books.routes"));

//route principale pour la gestion des utilisateurs
app.use("/api/auth", require("./routes/User.routes"));


// en cas d'erreur serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas");
});

module.exports = app;
