/*eslint-disable*/

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
  
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: no token provided." });
    }
  
    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
      next();
    } catch (err) {
      console.error("Authentication failed", err);
      return res
        .status(401)
        .json({ message: "Authentication failed: invalid token." });
    }
}

module.exports = authenticateToken;