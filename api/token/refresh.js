const jwt = require("jsonwebtoken");
const setSecurityHeaders = require("../_lib/securityHeaders");

const ACCESS_EXPIRES = "30m";

module.exports = async (req, res) => {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).end();

  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ detail: "Refresh token is required." });
  }

  try {
    const payload = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    const { id, email } = payload;
    res.json({ access: jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES }) });
  } catch {
    res.status(401).json({ detail: "Token is invalid or expired." });
  }
};
