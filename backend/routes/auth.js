const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const ACCESS_EXPIRES = "30m";
const REFRESH_EXPIRES = "1d";

function signAccess(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

// POST /api/user/register/
router.post("/user/register/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ detail: "username and password are required." });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ username: ["A user with that username already exists."] });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });
  res.status(201).json({ id: user._id, username: user.username });
});

// POST /api/token/
router.post("/token/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ detail: "No active account found with the given credentials." });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ detail: "No active account found with the given credentials." });
  }

  const payload = { id: user._id.toString(), username: user.username };
  res.json({ access: signAccess(payload), refresh: signRefresh(payload) });
});

// POST /api/token/refresh/
router.post("/token/refresh/", (req, res) => {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ detail: "Refresh token is required." });
  }

  try {
    const payload = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    const { id, username } = payload;
    res.json({ access: signAccess({ id, username }) });
  } catch {
    return res.status(401).json({ detail: "Token is invalid or expired." });
  }
});

module.exports = router;
