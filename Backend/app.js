/* eslint-disable */

const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoose = require("mongoose");

// Import your routes
const { API_ROUTES, API_URL } = require("../src/utils/constants");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par windowMs
});

// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(limiter); // Apply to all requests

// Use the routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(API_ROUTES.SIGN_UP, require("./routes/User"));
app.use(API_ROUTES.SIGN_IN, require("./routes/User"));
app.use(API_ROUTES.BOOKS, require("./routes/Books"));
app.use(API_ROUTES.BEST_RATED, require("./routes/Books"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

module.exports = app;
