const { connectDB } = require("../_lib/db");
const User = require("../_lib/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_EXPIRES = "30m";
const REFRESH_EXPIRES = "1d";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectDB();

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
    res.json({
      access: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES }),
      refresh: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
