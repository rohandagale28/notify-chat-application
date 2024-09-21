const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in a cookie named "token"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." ,redirectTo: '/login'});
  }

  try {
    const decoded = jwt.verify(token, "workspace28");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = { verifyToken };
