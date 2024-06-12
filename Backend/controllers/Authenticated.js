/*eslint-disable*/
const jwt = require("jsonwebtoken");

exports.getAuthenticatedUser = (req, res) => {
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
};