const jwt = require("jsonwebtoken");

// Returns the decoded token payload, or null if auth fails (and sends the 401 itself).
function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ detail: "Authentication credentials were not provided." });
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ detail: "Token is invalid or expired." });
    return null;
  }
}

module.exports = requireAuth;
