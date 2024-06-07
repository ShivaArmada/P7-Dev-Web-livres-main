/*eslint-disable*/
const express = require ('express');
const router = express.Router();

const authenticateToken = require ('../Middleware/authenticate');


router.get(API_ROUTES.AUTHENTICATED_USER, authenticateToken, (req, res) => {
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