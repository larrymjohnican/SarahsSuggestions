const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");
const User = require("../models/User");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const ACCESS_EXPIRES = "30m";
const REFRESH_EXPIRES = "1d";

const FRONTEND_URL = process.env.FRONTEND_URL || "https://frontend-psi-gray-68.vercel.app";

function signAccess(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

// POST /api/user/register/
router.post("/user/register/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ detail: "email and password are required." });
  }

  // Basic input length limits
  if (email.length > 254 || password.length > 128) {
    return res.status(400).json({ detail: "Input exceeds maximum length." });
  }

  // Password strength: min 8 chars, at least one letter and one number
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({ detail: "Password must be at least 8 characters and include a letter and a number." });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res.status(400).json({ email: ["A user with that email already exists."] });
  }

  const hashed = await bcrypt.hash(password, 12);
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const user = await User.create({
    email: normalizedEmail,
    password: hashed,
    verified: false,
    verifyToken,
    verifyTokenExpires,
  });

  // Send verification email
  const verifyUrl = `${FRONTEND_URL}/verify?token=${verifyToken}`;
  await resend.emails.send({
    from: "Sarah's Suggestions <noreply@sarahssuggestions.com>",
    to: normalizedEmail,
    subject: "Verify your email – Sarah's Suggestions",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; color: #1a1a2e;">
        <h1 style="color: #c9a84c; font-size: 24px; margin-bottom: 8px;">Sarah's Suggestions 🌙</h1>
        <p style="font-size: 16px; line-height: 1.6;">Thanks for signing up! Click below to verify your email and get started.</p>
        <a href="${verifyUrl}" style="display:inline-block; margin: 24px 0; padding: 12px 28px; background: #c9a84c; color: #1a1a2e; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
          Verify my email
        </a>
        <p style="font-size: 13px; color: #666;">If you didn't sign up, you can ignore this email.</p>
        <p style="font-size: 13px; color: #666;">This link expires after 24 hours.</p>
      </div>
    `,
  });

  res.status(201).json({ detail: "Account created. Check your email to verify your account." });
});

// GET /api/user/verify?token=...
router.get("/user/verify", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ detail: "Token is required." });

  const user = await User.findOne({ verifyToken: token });
  if (!user || !user.verifyTokenExpires || user.verifyTokenExpires < new Date()) {
    return res.status(400).json({ detail: "Invalid or expired verification link." });
  }

  user.verified = true;
  user.verifyToken = null;
  user.verifyTokenExpires = null;
  await user.save();

  res.json({ detail: "Email verified successfully. You can now log in." });
});

// POST /api/token/
router.post("/token/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ detail: "email and password are required." });
  }
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    return res.status(401).json({ detail: "No active account found with the given credentials." });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ detail: "No active account found with the given credentials." });
  }

  if (!user.verified) {
    return res.status(403).json({ detail: "Please verify your email before logging in." });
  }

  const payload = { id: user._id.toString(), email: user.email };
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
    const { id, email } = payload;
    res.json({ access: signAccess({ id, email }) });
  } catch {
    return res.status(401).json({ detail: "Token is invalid or expired." });
  }
});

module.exports = router;
