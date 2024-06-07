/* eslint-disable */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const mongoose = require('mongoose');

// Import your routes
const { API_ROUTES } = require("../src/utils/constants");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

module.exports = app;