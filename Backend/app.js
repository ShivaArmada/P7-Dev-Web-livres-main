/* eslint-disable */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const mongoose = require('mongoose');

// ici on importe les routes pour les utiliser, c'est le fichier principal d'execution de l'application, il va renvoyer les requetes et les réponses (comme un processeur)

// Import your routes
const { API_ROUTES } = require("../src/utils/constants");
//le serveur express
const app = express();
//parse en JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
app.use(helmet());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

module.exports = app;