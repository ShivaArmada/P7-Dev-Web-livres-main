/* eslint-disable */
require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");

// Import your routes
const { API_ROUTES } = require("../src/utils/constants");

const app = express();

// Enable CORS for the frontend app
app.use(cors({ origin: "http://localhost:3000" }));

// Use Helmet for basic security
app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: no token provided." });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("Authentication failed", err);
    return res
      .status(401)
      .json({ message: "Authentication failed: invalid token." });
  }
}

app.post(API_ROUTES.SIGN_UP, (req, res) => {
  // Handle user registration
  const token = jwt.sign({ userId: "user-id" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({
    message: "Bienvenue sur MonVieuxGrimoire! Votre inscription a été réussie.",
    token,
  });
});

app.post(API_ROUTES.SIGN_IN, async (req, res) => {
  // Handle user sign in
  const { email, password } = req.body;

  // TODO: Validate email and password, and check them against your user database.
  // If the user is valid, generate a token and return it.
  // This is just a placeholder implementation.

  const user = { userId: 'user-id' }; // Replace this with actual user lookup

  if (user) {
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Vous êtes maintenant connecté à MonVieuxGrimoire!', token, userId: user.userId });
  } else {
    res.status(401).json({ message: 'Authentication failed: invalid email or password.' });
  }
});

app.get(API_ROUTES.BOOKS, async (req, res) => {
  // Return list of books
});

app.get(API_ROUTES.BEST_RATED, (req, res) => {
  // Return list of best rated books
});

app.get(API_ROUTES.AUTHENTICATED_USER, authenticateToken, (req, res) => {
  const token = req.headers.authorization;
  const userId = req.headers.userid;

  if (!token) {
    return res.json({ authenticated: false, user: null });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ authenticated: true, user: { userId, token } });
  } catch (err) {
    console.error("getAuthenticatedUser, Something Went Wrong", err);
    return res.json({ authenticated: false, user: null });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500, quelque chose ne va pas!");
});

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
});
