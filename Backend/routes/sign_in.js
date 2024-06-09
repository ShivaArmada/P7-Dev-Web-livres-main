/*eslint-disable*/
const express = require ('express');
const router = express.Router();

const User = require ('../models/UserIn');


router.post(API_ROUTES.SIGN_IN, async (req, res) => {
    // Handle user sign in
    const { email, password } = req.body;
  
    // TODO: Validate email and password, and check them against your user database.
    // If the user is valid, generate a token and return it.
    // This is just a placeholder implementation.
  
    const user = { userId: 'user-id' }; // Replace this with actual user lookup
  
    if (user) {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '3h' });
      res.json({ message: 'Vous êtes maintenant connecté à MonVieuxGrimoire!', token, userId: user.userId });
    } else {
      res.status(401).json({ message: 'Authentication failed: invalid email or password.' });
    }
  });