const { connectDB } = require("../_lib/db");
const User = require("../_lib/models/User");
const bcrypt = require("bcryptjs");
const setSecurityHeaders = require("../_lib/securityHeaders");

module.exports = async (req, res) => {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectDB();

    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ detail: "Token and password are required." });
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.status(400).json({ detail: "Password must be at least 8 characters and include a letter and a number." });
    }

    const user = await User.findOne({ resetToken: token });
    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ detail: "This reset link is invalid or has expired." });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ detail: "Password reset successfully. You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
